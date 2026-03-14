import { z } from "zod";
import { adminProcedure, router } from "../_core/trpc";
import {
  createAuditLog,
  createCoupon,
  createProduct,
  deleteProduct,
  deleteCoupon,
  getAuditLogs,
  getBackupPayload,
  getCoupons,
  getPromoBanners,
  createPromoBanner,
  updatePromoBanner,
  deletePromoBanner,
  getDashboardKpis,
  getAllOrders,
  getAllWaitlistEmails,
  getUserById,
  getOrdersByFilters,
  getProductsAdmin,
  getSalesByPeriod,
  getUsersWithStats,
  replaceProductImages,
  replaceProductVariants,
  restoreBackupPayload,
  setOrderAdminData,
  setUserFlags,
  updateProduct,
  updateCoupon,
  updateUserRole,
} from "../db";
import { ENV } from "../_core/env";
import { TRPCError } from "@trpc/server";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { sendWaitlistLaunchEmail } from "../services/emailService.js";

const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "paid",
  "shipped",
  "delivered",
  "cancelled",
]);

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const adminRouter = router({
  dashboard: adminProcedure.query(async () => {
    const [kpis, users, products, orders] = await Promise.all([
      getDashboardKpis(),
      getUsersWithStats(),
      getProductsAdmin(),
      getAllOrders(),
    ]);

    return {
      ...kpis,
      usersCount: users.length,
      productsCount: products.length,
      ordersCount: orders.length,
    };
  }),

  usersList: adminProcedure.query(async () => {
    const users = await getUsersWithStats();
    return users;
  }),

  userSetRole: adminProcedure
    .input(
      z.object({
        userId: z.number().int().positive(),
        role: z.enum(["user", "admin"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.role === "admin") {
        const targetUser = await getUserById(input.userId);
        const normalizedEmail = String(targetUser?.email ?? "").trim().toLowerCase();
        const allowedAdmin = Boolean(normalizedEmail) && ENV.adminEmails.includes(normalizedEmail);
        if (!allowedAdmin) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Este email nao pode receber permissao de admin.",
          });
        }
      }

      await updateUserRole(input.userId, input.role);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "user.setRole",
        entity: "user",
        entityId: String(input.userId),
        metadata: { role: input.role },
      });
      return { success: true } as const;
    }),

  userSetFlags: adminProcedure
    .input(
      z.object({
        userId: z.number().int().positive(),
        isVip: z.boolean().optional(),
        isBlocked: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await setUserFlags(input.userId, {
        isVip: input.isVip,
        isBlocked: input.isBlocked,
      });
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "user.setFlags",
        entity: "user",
        entityId: String(input.userId),
        metadata: { isVip: input.isVip, isBlocked: input.isBlocked },
      });
      return { success: true } as const;
    }),

  productsList: adminProcedure.query(async () => {
    const products = await getProductsAdmin();
    return products;
  }),

  productCreate: adminProcedure
    .input(
      z.object({
        name: z.string().min(1),
        category: z.string().min(1),
        price: z.number().positive(),
        description: z.string().optional(),
        fullDescription: z.string().optional(),
        imageUrl: z.string().optional(),
        optionColors: z.array(z.string().min(1).max(60)).optional().default([]),
        optionSizes: z.array(z.string().min(1).max(60)).optional().default([]),
        sizeType: z.enum(["alpha", "numeric", "custom"]).optional().default("alpha"),
        stock: z.number().int().min(0).default(0),
        images: z.array(z.string().url()).optional().default([]),
        variants: z
          .array(
            z.object({
              name: z.string().min(1),
              sku: z.string().optional().nullable(),
              price: z.number().optional().nullable(),
              stock: z.number().int().min(0),
            }),
          )
          .optional()
          .default([]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { images, variants, optionColors, optionSizes, sizeType, ...rest } = input;
      const productData = {
        ...rest,
        optionColors: optionColors.length > 0 ? JSON.stringify(optionColors) : null,
        optionSizes: optionSizes.length > 0 ? JSON.stringify(optionSizes) : null,
        sizeType,
      };
      const result = await createProduct(productData);
      const insertedId = Number((result as any)?.[0]?.insertId ?? 0);
      if (insertedId > 0) {
        const allImages = [...images];
        if (productData.imageUrl) allImages.unshift(productData.imageUrl);
        await replaceProductImages(insertedId, allImages);
        await replaceProductVariants(insertedId, variants);
      }
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "product.create",
        entity: "product",
        entityId: String(insertedId || "new"),
        metadata: { name: productData.name, category: productData.category },
      });
      return { success: true } as const;
    }),

  productUpdate: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        name: z.string().optional(),
        category: z.string().optional(),
        price: z.number().positive().optional(),
        description: z.string().optional(),
        fullDescription: z.string().optional(),
        imageUrl: z.string().optional(),
        optionColors: z.array(z.string().min(1).max(60)).optional(),
        optionSizes: z.array(z.string().min(1).max(60)).optional(),
        sizeType: z.enum(["alpha", "numeric", "custom"]).optional(),
        stock: z.number().int().min(0).optional(),
        images: z.array(z.string().url()).optional(),
        variants: z
          .array(
            z.object({
              name: z.string().min(1),
              sku: z.string().optional().nullable(),
              price: z.number().optional().nullable(),
              stock: z.number().int().min(0),
            }),
          )
          .optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, images, variants, optionColors, optionSizes, sizeType, ...rest } = input;
      const data = {
        ...rest,
        ...(optionColors !== undefined
          ? { optionColors: optionColors.length > 0 ? JSON.stringify(optionColors) : null }
          : {}),
        ...(optionSizes !== undefined
          ? { optionSizes: optionSizes.length > 0 ? JSON.stringify(optionSizes) : null }
          : {}),
        ...(sizeType !== undefined ? { sizeType } : {}),
      };
      await updateProduct(id, data);
      if (images) await replaceProductImages(id, images);
      if (variants) await replaceProductVariants(id, variants);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "product.update",
        entity: "product",
        entityId: String(id),
        metadata: data,
      });
      return { success: true } as const;
    }),

  productDelete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await deleteProduct(input.id);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "product.delete",
        entity: "product",
        entityId: String(input.id),
      });
      return { success: true } as const;
    }),

  ordersList: adminProcedure
    .input(
      z.object({
        status: orderStatusSchema.optional(),
        from: z.string().datetime().optional(),
        to: z.string().datetime().optional(),
      }).optional(),
    )
    .query(async ({ input }) => {
      const orders = await getOrdersByFilters(
        input
          ? {
              status: input.status,
              from: input.from ? new Date(input.from) : undefined,
              to: input.to ? new Date(input.to) : undefined,
            }
          : undefined,
      );
    return orders;
  }),

  orderUpdate: adminProcedure
    .input(
      z.object({
        orderId: z.number().int().positive(),
        status: orderStatusSchema.optional(),
        trackingCode: z.string().max(120).optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await setOrderAdminData(input.orderId, {
        status: input.status,
        trackingCode: input.trackingCode,
      });
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "order.update",
        entity: "order",
        entityId: String(input.orderId),
        metadata: { status: input.status, trackingCode: input.trackingCode },
      });
      return { success: true } as const;
    }),

  couponsList: adminProcedure.query(async () => {
    return await getCoupons();
  }),

  couponCreate: adminProcedure
    .input(
      z.object({
        code: z.string().min(3).max(64),
        type: z.enum(["percent", "fixed"]),
        value: z.number().positive(),
        maxUses: z.number().int().positive().optional().nullable(),
        startsAt: z.string().datetime().optional().nullable(),
        expiresAt: z.string().datetime().optional().nullable(),
        isActive: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await createCoupon({
        code: input.code,
        type: input.type,
        value: input.value,
        maxUses: input.maxUses ?? null,
        startsAt: input.startsAt ? new Date(input.startsAt) : null,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
        isActive: input.isActive,
      });
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "coupon.create",
        entity: "coupon",
        entityId: input.code.toUpperCase(),
      });
      return { success: true } as const;
    }),

  couponUpdate: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        code: z.string().min(3).max(64).optional(),
        type: z.enum(["percent", "fixed"]).optional(),
        value: z.number().positive().optional(),
        maxUses: z.number().int().positive().optional().nullable(),
        startsAt: z.string().datetime().optional().nullable(),
        expiresAt: z.string().datetime().optional().nullable(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await updateCoupon(input.id, {
        code: input.code,
        type: input.type,
        value: input.value,
        maxUses: input.maxUses,
        startsAt: input.startsAt ? new Date(input.startsAt) : input.startsAt === null ? null : undefined,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : input.expiresAt === null ? null : undefined,
        isActive: input.isActive,
      });
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "coupon.update",
        entity: "coupon",
        entityId: String(input.id),
      });
      return { success: true } as const;
    }),

  couponDelete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await deleteCoupon(input.id);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "coupon.delete",
        entity: "coupon",
        entityId: String(input.id),
      });
      return { success: true } as const;
    }),

  promoBannersList: adminProcedure.query(async () => {
    return await getPromoBanners();
  }),

  promoBannerCreate: adminProcedure
    .input(
      z.object({
        badge: z.string().min(1).max(80),
        title: z.string().min(1).max(255),
        description: z.string().min(1).max(1000),
        ctaLabel: z.string().min(1).max(120),
        imageUrl: z.string().trim().max(500).optional().default(""),
        imageAlt: z.string().trim().max(255).optional().default(""),
        linkUrl: z.string().trim().max(500).optional().default(""),
        discountText: z.string().min(1).max(60),
        discountLabel: z.string().min(1).max(40).default("OFF"),
        bgStyle: z.string().min(1).max(255),
        sortOrder: z.number().int().default(0),
        isActive: z.boolean().default(true),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await createPromoBanner(input);
      const insertedId = Number((result as any)?.[0]?.insertId ?? 0);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "promoBanner.create",
        entity: "promoBanner",
        entityId: String(insertedId || "new"),
      });
      return { success: true } as const;
    }),

  promoBannerUpdate: adminProcedure
    .input(
      z.object({
        id: z.number().int().positive(),
        badge: z.string().min(1).max(80).optional(),
        title: z.string().min(1).max(255).optional(),
        description: z.string().min(1).max(1000).optional(),
        ctaLabel: z.string().min(1).max(120).optional(),
        imageUrl: z.string().trim().max(500).nullable().optional(),
        imageAlt: z.string().trim().max(255).nullable().optional(),
        linkUrl: z.string().trim().max(500).nullable().optional(),
        discountText: z.string().min(1).max(60).optional(),
        discountLabel: z.string().min(1).max(40).optional(),
        bgStyle: z.string().min(1).max(255).optional(),
        sortOrder: z.number().int().optional(),
        isActive: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await updatePromoBanner(id, data);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "promoBanner.update",
        entity: "promoBanner",
        entityId: String(id),
      });
      return { success: true } as const;
    }),

  promoBannerDelete: adminProcedure
    .input(z.object({ id: z.number().int().positive() }))
    .mutation(async ({ ctx, input }) => {
      await deletePromoBanner(input.id);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "promoBanner.delete",
        entity: "promoBanner",
        entityId: String(input.id),
      });
      return { success: true } as const;
    }),

  reportsSalesCsv: adminProcedure
    .input(
      z.object({
        from: z.string().datetime(),
        to: z.string().datetime(),
      }),
    )
    .query(async ({ input }) => {
      const rows = await getSalesByPeriod(new Date(input.from), new Date(input.to));
      const header = "date,totalSalesCents,ordersCount";
      const lines = rows.map(row => `${row.day},${row.totalSales},${row.ordersCount}`);
      return {
        fileName: `sales-report-${input.from.slice(0, 10)}-${input.to.slice(0, 10)}.csv`,
        csv: [header, ...lines].join("\n"),
      };
    }),

  auditList: adminProcedure
    .input(z.object({ limit: z.number().int().min(1).max(1000).default(300) }).optional())
    .query(async ({ input }) => {
      return await getAuditLogs(input?.limit ?? 300);
    }),

  backupManual: adminProcedure.mutation(async ({ ctx }) => {
    const backup = await getBackupPayload();
    const dir = process.env.BACKUP_DIR || "backups";
    await mkdir(dir, { recursive: true });
    const fileName = `backup-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;
    const filePath = path.join(dir, fileName);
    await writeFile(filePath, JSON.stringify(backup, null, 2), "utf-8");
    await createAuditLog({
      actorUserId: ctx.user.id,
      action: "backup.manual",
      entity: "backup",
      entityId: fileName,
    });
    return { fileName, filePath };
  }),

  backupsList: adminProcedure.query(async () => {
    const dir = process.env.BACKUP_DIR || "backups";
    await mkdir(dir, { recursive: true });
    const files = await readdir(dir);
    return files.filter(name => name.endsWith(".json")).sort().reverse();
  }),

  backupRestore: adminProcedure
    .input(z.object({ fileName: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const dir = process.env.BACKUP_DIR || "backups";
      const filePath = path.join(dir, input.fileName);
      const raw = await readFile(filePath, "utf-8");
      const payload = JSON.parse(raw) as Parameters<typeof restoreBackupPayload>[0];
      await restoreBackupPayload(payload);
      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "backup.restore",
        entity: "backup",
        entityId: input.fileName,
      });
      return { success: true } as const;
    }),

  waitlistLaunchSend: adminProcedure
    .input(
      z.object({
        couponCode: z.string().min(3).max(64),
        discountPercent: z.number().positive().max(100).default(15),
        launchUrl: z.string().url().optional(),
        batchSize: z.number().int().min(1).max(100).default(25),
        delayMs: z.number().int().min(300).max(5000).default(700),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const waitlist = await getAllWaitlistEmails();
      const uniqueEmails = [...new Set(waitlist.map(item => String(item.email ?? "").trim().toLowerCase()).filter(Boolean))];

      if (uniqueEmails.length === 0) {
        return {
          success: true,
          total: 0,
          sent: 0,
          failed: 0,
          failures: [],
          message: "Nenhum email encontrado na lista de espera.",
        } as const;
      }

      const failures: Array<{ email: string; message: string }> = [];
      let sent = 0;

      for (let index = 0; index < uniqueEmails.length; index += input.batchSize) {
        const batch = uniqueEmails.slice(index, index + input.batchSize);
        for (const email of batch) {
          try {
            await sendWaitlistLaunchEmail({
              email,
              couponCode: input.couponCode,
              discountPercent: input.discountPercent,
              launchUrl: input.launchUrl,
            });
            sent += 1;
          } catch (error) {
            failures.push({
              email,
              message: error instanceof Error ? error.message : "Falha desconhecida",
            });
          }

          await sleep(input.delayMs);
        }
      }

      await createAuditLog({
        actorUserId: ctx.user.id,
        action: "waitlist.launch.send",
        entity: "waitlist",
        entityId: input.couponCode.toUpperCase(),
        metadata: {
          total: uniqueEmails.length,
          sent,
          failed: failures.length,
          discountPercent: input.discountPercent,
          launchUrl: input.launchUrl ?? ENV.frontendUrl ?? process.env.APP_BASE_URL ?? "https://l4ckos.com.br",
        },
      });

      return {
        success: failures.length === 0,
        total: uniqueEmails.length,
        sent,
        failed: failures.length,
        failures,
        message:
          failures.length === 0
            ? "Disparo para a lista de espera concluido com sucesso."
            : "Disparo concluido com falhas parciais.",
      } as const;
    }),
});

