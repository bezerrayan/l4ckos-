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
  getDashboardKpis,
  getAllOrders,
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
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const orderStatusSchema = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

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
      const { images, variants, ...productData } = input;
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
      const { id, images, variants, ...data } = input;
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
});
