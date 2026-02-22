import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  products,
  InsertProduct,
  cartItems,
  orders,
  orderItems,
  favorites,
  productImages,
  productVariants,
  coupons,
  auditLogs,
  localAuthUsers,
  userProfiles,
  userAddresses,
  userPaymentMethods,
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Produtos
export async function getProducts() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(products);
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createProduct(product: InsertProduct) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(products).values(product);
  return result;
}

export async function updateProduct(id: number, product: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(products).set(product).where(eq(products.id, id));
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(products).where(eq(products.id, id));
}

// Carrinho
export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(cartItems).where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(cartItems).values({ userId, productId, quantity });
}

export async function removeFromCart(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(cartItems).where(eq(cartItems.id, id));
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(cartItems).where(eq(cartItems.userId, userId));
}

// Pedidos
export async function createOrder(userId: number, totalPrice: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(orders).values({ userId, totalPrice });
  return result;
}

export async function getOrdersByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orders).where(eq(orders.userId, userId));
}

export async function getAllOrders() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(orders);
}

export async function updateOrderStatus(
  orderId: number,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled",
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(orders).set({ status }).where(eq(orders.id, orderId));
}

export async function getAllUsers() {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(users);
}

export async function updateUserRole(userId: number, role: "user" | "admin") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.update(users).set({ role }).where(eq(users.id, userId));
}

// Favoritos
export async function getFavorites(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return await db.select().from(favorites).where(eq(favorites.userId, userId));
}

export async function addFavorite(userId: number, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(favorites).values({ userId, productId });
}

export async function removeFavorite(userId: number, productId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(favorites).where(eq(favorites.userId, userId));
}

type ProfileAddressInput = {
  label: string;
  recipient: string;
  zipCode: string;
  street: string;
  number: string;
  complement?: string | null;
  neighborhood: string;
  city: string;
  state: string;
  isDefault: boolean;
};

type ProfilePaymentInput = {
  label: string;
  holderName: string;
  brand: string;
  last4: string;
  expiry: string;
  isDefault: boolean;
};

export async function getProfileData(userId: number) {
  const db = await getDb();
  if (!db) {
    return {
      phone: "",
      addresses: [] as Array<{
        id: number;
        label: string;
        recipient: string;
        zipCode: string;
        street: string;
        number: string;
        complement: string;
        neighborhood: string;
        city: string;
        state: string;
        isDefault: boolean;
      }>,
      payments: [] as Array<{
        id: number;
        label: string;
        holderName: string;
        brand: string;
        last4: string;
        expiry: string;
        isDefault: boolean;
      }>,
    };
  }

  const profileRow = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  const addressRows = await db
    .select()
    .from(userAddresses)
    .where(eq(userAddresses.userId, userId));

  const paymentRows = await db
    .select()
    .from(userPaymentMethods)
    .where(eq(userPaymentMethods.userId, userId));

  return {
    phone: profileRow[0]?.phone ?? "",
    addresses: addressRows.map((item) => ({
      id: item.id,
      label: item.label,
      recipient: item.recipient,
      zipCode: item.zipCode,
      street: item.street,
      number: item.number,
      complement: item.complement ?? "",
      neighborhood: item.neighborhood,
      city: item.city,
      state: item.state,
      isDefault: item.isDefault === 1,
    })),
    payments: paymentRows.map((item) => ({
      id: item.id,
      label: item.label,
      holderName: item.holderName,
      brand: item.brand,
      last4: item.last4,
      expiry: item.expiry,
      isDefault: item.isDefault === 1,
    })),
  };
}

export async function saveProfileData(
  userId: number,
  payload: {
    name?: string;
    email?: string;
    phone: string;
    addresses: ProfileAddressInput[];
    payments: ProfilePaymentInput[];
  },
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (payload.name !== undefined || payload.email !== undefined) {
    await db
      .update(users)
      .set({
        ...(payload.name !== undefined ? { name: payload.name || null } : {}),
        ...(payload.email !== undefined ? { email: payload.email || null } : {}),
      })
      .where(eq(users.id, userId));
  }

  const existing = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.userId, userId))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(userProfiles)
      .set({ phone: payload.phone || null })
      .where(eq(userProfiles.userId, userId));
  } else {
    await db.insert(userProfiles).values({
      userId,
      phone: payload.phone || null,
    });
  }

  await db.delete(userAddresses).where(eq(userAddresses.userId, userId));
  if (payload.addresses.length > 0) {
    await db.insert(userAddresses).values(
      payload.addresses.map((item, index) => ({
        userId,
        label: item.label,
        recipient: item.recipient,
        zipCode: item.zipCode,
        street: item.street,
        number: item.number,
        complement: item.complement || null,
        neighborhood: item.neighborhood,
        city: item.city,
        state: item.state,
        isDefault: item.isDefault || index === 0 ? 1 : 0,
      })),
    );
  }

  await db.delete(userPaymentMethods).where(eq(userPaymentMethods.userId, userId));
  if (payload.payments.length > 0) {
    await db.insert(userPaymentMethods).values(
      payload.payments.map((item, index) => ({
        userId,
        label: item.label,
        holderName: item.holderName,
        brand: item.brand,
        last4: item.last4,
        expiry: item.expiry,
        isDefault: item.isDefault || index === 0 ? 1 : 0,
      })),
    );
  }
}

export async function setUserFlags(
  userId: number,
  flags: { isVip?: boolean; isBlocked?: boolean },
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(users)
    .set({
      ...(flags.isVip !== undefined ? { isVip: flags.isVip ? 1 : 0 } : {}),
      ...(flags.isBlocked !== undefined ? { isBlocked: flags.isBlocked ? 1 : 0 } : {}),
    })
    .where(eq(users.id, userId));
}

export async function getUsersWithStats() {
  const db = await getDb();
  if (!db) return [];

  const usersRows = await db.select().from(users);
  const counts = await db
    .select({ userId: orders.userId, count: sql<number>`count(*)` })
    .from(orders)
    .groupBy(orders.userId);

  const countMap = new Map<number, number>();
  for (const row of counts) {
    countMap.set(Number(row.userId), Number(row.count));
  }

  return usersRows.map(user => ({
    ...user,
    isVip: user.isVip === 1,
    isBlocked: user.isBlocked === 1,
    ordersCount: countMap.get(user.id) ?? 0,
  }));
}

export async function getOrdersByFilters(filters?: {
  status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  from?: Date;
  to?: Date;
}) {
  const db = await getDb();
  if (!db) return [];

  const whereClauses = [] as Array<ReturnType<typeof eq>>;
  if (filters?.status) whereClauses.push(eq(orders.status, filters.status));
  if (filters?.from) whereClauses.push(gte(orders.createdAt, filters.from));
  if (filters?.to) whereClauses.push(lte(orders.createdAt, filters.to));

  const baseOrders = whereClauses.length
    ? await db.select().from(orders).where(and(...whereClauses)).orderBy(desc(orders.id))
    : await db.select().from(orders).orderBy(desc(orders.id));

  const items = await db.select().from(orderItems);
  const itemsByOrder = new Map<number, typeof items>();
  for (const item of items) {
    const current = itemsByOrder.get(item.orderId) ?? [];
    current.push(item);
    itemsByOrder.set(item.orderId, current);
  }

  return baseOrders.map(order => ({
    ...order,
    items: itemsByOrder.get(order.id) ?? [],
  }));
}

export async function setOrderAdminData(
  orderId: number,
  data: {
    status?: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    trackingCode?: string | null;
  },
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(orders)
    .set({
      ...(data.status ? { status: data.status } : {}),
      ...(data.trackingCode !== undefined ? { trackingCode: data.trackingCode } : {}),
    })
    .where(eq(orders.id, orderId));
}

export async function replaceProductImages(productId: number, imageUrls: string[]) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(productImages).where(eq(productImages.productId, productId));
  if (imageUrls.length > 0) {
    await db.insert(productImages).values(
      imageUrls.map((imageUrl, index) => ({
        productId,
        imageUrl,
        order: index,
      })),
    );
  }
}

export async function replaceProductVariants(
  productId: number,
  variants: Array<{ name: string; sku?: string | null; price?: number | null; stock: number }>,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(productVariants).where(eq(productVariants.productId, productId));
  if (variants.length > 0) {
    await db.insert(productVariants).values(
      variants.map(variant => ({
        productId,
        name: variant.name,
        sku: variant.sku ?? null,
        price: variant.price ?? null,
        stock: variant.stock,
      })),
    );
  }
}

export async function getProductsAdmin() {
  const db = await getDb();
  if (!db) return [];
  const productRows = await db.select().from(products).orderBy(desc(products.id));
  const imageRows = await db.select().from(productImages);
  const variantRows = await db.select().from(productVariants);

  const imagesMap = new Map<number, typeof imageRows>();
  for (const item of imageRows) {
    const current = imagesMap.get(item.productId) ?? [];
    current.push(item);
    imagesMap.set(item.productId, current);
  }

  const variantsMap = new Map<number, typeof variantRows>();
  for (const item of variantRows) {
    const current = variantsMap.get(item.productId) ?? [];
    current.push(item);
    variantsMap.set(item.productId, current);
  }

  return productRows.map(product => ({
    ...product,
    images: imagesMap.get(product.id) ?? [],
    variants: variantsMap.get(product.id) ?? [],
  }));
}

export async function createCoupon(payload: {
  code: string;
  type: "percent" | "fixed";
  value: number;
  maxUses?: number | null;
  startsAt?: Date | null;
  expiresAt?: Date | null;
  isActive?: boolean;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.insert(coupons).values({
    code: payload.code.toUpperCase(),
    type: payload.type,
    value: payload.value,
    maxUses: payload.maxUses ?? null,
    startsAt: payload.startsAt ?? null,
    expiresAt: payload.expiresAt ?? null,
    isActive: payload.isActive === false ? 0 : 1,
  });
}

export async function getCoupons() {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(coupons).orderBy(desc(coupons.id));
  return rows.map(item => ({ ...item, isActive: item.isActive === 1 }));
}

export async function updateCoupon(
  id: number,
  payload: Partial<{
    code: string;
    type: "percent" | "fixed";
    value: number;
    maxUses: number | null;
    startsAt: Date | null;
    expiresAt: Date | null;
    isActive: boolean;
  }>,
) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db
    .update(coupons)
    .set({
      ...(payload.code !== undefined ? { code: payload.code.toUpperCase() } : {}),
      ...(payload.type !== undefined ? { type: payload.type } : {}),
      ...(payload.value !== undefined ? { value: payload.value } : {}),
      ...(payload.maxUses !== undefined ? { maxUses: payload.maxUses } : {}),
      ...(payload.startsAt !== undefined ? { startsAt: payload.startsAt } : {}),
      ...(payload.expiresAt !== undefined ? { expiresAt: payload.expiresAt } : {}),
      ...(payload.isActive !== undefined ? { isActive: payload.isActive ? 1 : 0 } : {}),
    })
    .where(eq(coupons.id, id));
}

export async function deleteCoupon(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return await db.delete(coupons).where(eq(coupons.id, id));
}

export async function createAuditLog(payload: {
  actorUserId: number;
  action: string;
  entity: string;
  entityId?: string;
  metadata?: unknown;
}) {
  const db = await getDb();
  if (!db) return;
  await db.insert(auditLogs).values({
    actorUserId: payload.actorUserId,
    action: payload.action,
    entity: payload.entity,
    entityId: payload.entityId ?? null,
    metadata: payload.metadata ? JSON.stringify(payload.metadata) : null,
  });
}

export async function getAuditLogs(limit = 300) {
  const db = await getDb();
  if (!db) return [];
  const rows = await db.select().from(auditLogs).orderBy(desc(auditLogs.id)).limit(limit);
  return rows.map(item => ({
    ...item,
    metadata: item.metadata ? JSON.parse(item.metadata) : null,
  }));
}

export async function getDashboardKpis() {
  const db = await getDb();
  if (!db) {
    return {
      salesToday: 0,
      pendingOrders: 0,
      lowStockCount: 0,
      ordersToday: 0,
    };
  }

  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const [salesTodayRow] = await db
    .select({ total: sql<number>`coalesce(sum(${orders.totalPrice}), 0)` })
    .from(orders)
    .where(and(gte(orders.createdAt, startOfDay), eq(orders.status, "delivered")));

  const [pendingRow] = await db
    .select({ total: sql<number>`count(*)` })
    .from(orders)
    .where(eq(orders.status, "pending"));

  const [lowStockRow] = await db
    .select({ total: sql<number>`count(*)` })
    .from(products)
    .where(lte(products.stock, 5));

  const [ordersTodayRow] = await db
    .select({ total: sql<number>`count(*)` })
    .from(orders)
    .where(gte(orders.createdAt, startOfDay));

  return {
    salesToday: Number(salesTodayRow?.total ?? 0),
    pendingOrders: Number(pendingRow?.total ?? 0),
    lowStockCount: Number(lowStockRow?.total ?? 0),
    ordersToday: Number(ordersTodayRow?.total ?? 0),
  };
}

export async function getSalesByPeriod(from: Date, to: Date) {
  const db = await getDb();
  if (!db) return [];

  const rows = await db
    .select({
      day: sql<string>`date(${orders.createdAt})`,
      totalSales: sql<number>`coalesce(sum(${orders.totalPrice}), 0)`,
      ordersCount: sql<number>`count(*)`,
    })
    .from(orders)
    .where(and(gte(orders.createdAt, from), lte(orders.createdAt, to)))
    .groupBy(sql`date(${orders.createdAt})`)
    .orderBy(sql`date(${orders.createdAt}) asc`);

  return rows.map(row => ({
    day: row.day,
    totalSales: Number(row.totalSales),
    ordersCount: Number(row.ordersCount),
  }));
}

export async function upsertLocalAuthCredential(payload: {
  userId: number;
  email: string;
  passwordHash: string;
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db
    .select()
    .from(localAuthUsers)
    .where(eq(localAuthUsers.email, payload.email.toLowerCase()))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(localAuthUsers)
      .set({ userId: payload.userId, passwordHash: payload.passwordHash })
      .where(eq(localAuthUsers.id, existing[0].id));
    return;
  }

  await db.insert(localAuthUsers).values({
    userId: payload.userId,
    email: payload.email.toLowerCase(),
    passwordHash: payload.passwordHash,
  });
}

export async function getLocalAuthCredentialByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;
  const rows = await db
    .select()
    .from(localAuthUsers)
    .where(eq(localAuthUsers.email, email.toLowerCase()))
    .limit(1);
  return rows[0];
}

export async function getBackupPayload() {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [
    usersRows,
    productsRows,
    variantsRows,
    productImagesRows,
    ordersRows,
    orderItemsRows,
    couponsRows,
    profilesRows,
    addressesRows,
    paymentRows,
    auditRows,
  ] = await Promise.all([
    db.select().from(users),
    db.select().from(products),
    db.select().from(productVariants),
    db.select().from(productImages),
    db.select().from(orders),
    db.select().from(orderItems),
    db.select().from(coupons),
    db.select().from(userProfiles),
    db.select().from(userAddresses),
    db.select().from(userPaymentMethods),
    db.select().from(auditLogs),
  ]);

  return {
    exportedAt: new Date().toISOString(),
    data: {
      users: usersRows,
      products: productsRows,
      productVariants: variantsRows,
      productImages: productImagesRows,
      orders: ordersRows,
      orderItems: orderItemsRows,
      coupons: couponsRows,
      userProfiles: profilesRows,
      userAddresses: addressesRows,
      userPaymentMethods: paymentRows,
      auditLogs: auditRows,
    },
  };
}

export async function restoreBackupPayload(payload: {
  data: {
    users?: Array<any>;
    products?: Array<any>;
    productVariants?: Array<any>;
    productImages?: Array<any>;
    orders?: Array<any>;
    orderItems?: Array<any>;
    coupons?: Array<any>;
    userProfiles?: Array<any>;
    userAddresses?: Array<any>;
    userPaymentMethods?: Array<any>;
    auditLogs?: Array<any>;
  };
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(productVariants);
  await db.delete(productImages);
  await db.delete(products);
  await db.delete(coupons);
  await db.delete(userAddresses);
  await db.delete(userPaymentMethods);
  await db.delete(userProfiles);
  await db.delete(auditLogs);
  await db.delete(users);

  if (payload.data.users?.length) await db.insert(users).values(payload.data.users);
  if (payload.data.products?.length) await db.insert(products).values(payload.data.products);
  if (payload.data.productVariants?.length) await db.insert(productVariants).values(payload.data.productVariants);
  if (payload.data.productImages?.length) await db.insert(productImages).values(payload.data.productImages);
  if (payload.data.orders?.length) await db.insert(orders).values(payload.data.orders);
  if (payload.data.orderItems?.length) await db.insert(orderItems).values(payload.data.orderItems);
  if (payload.data.coupons?.length) await db.insert(coupons).values(payload.data.coupons);
  if (payload.data.userProfiles?.length) await db.insert(userProfiles).values(payload.data.userProfiles);
  if (payload.data.userAddresses?.length) await db.insert(userAddresses).values(payload.data.userAddresses);
  if (payload.data.userPaymentMethods?.length)
    await db.insert(userPaymentMethods).values(payload.data.userPaymentMethods);
  if (payload.data.auditLogs?.length) await db.insert(auditLogs).values(payload.data.auditLogs);
}
