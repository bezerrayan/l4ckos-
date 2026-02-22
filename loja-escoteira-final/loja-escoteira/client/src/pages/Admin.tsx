import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CSSProperties } from "react";
import { trpc } from "../lib/trpc";
import { useUser } from "../contexts/UserContext";
import { useToast } from "../contexts/ToastContext";

type Section =
  | "overview"
  | "customers"
  | "products"
  | "orders"
  | "coupons"
  | "reports"
  | "audit"
  | "backup";

const orderStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;
const emptyProductForm = {
  name: "",
  category: "",
  price: "",
  stock: "0",
  imageUrl: "",
  imagesCsv: "",
  variantsCsv: "",
  description: "",
};

export default function Admin() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();
  const { showToast } = useToast();
  const utils = trpc.useUtils();

  const [section, setSection] = useState<Section>("overview");
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>("");
  const [reportFrom, setReportFrom] = useState("");
  const [reportTo, setReportTo] = useState("");
  const [restoreFileName, setRestoreFileName] = useState("");
  const [newCoupon, setNewCoupon] = useState({ code: "", type: "percent", value: "10", maxUses: "" });
  const [newProduct, setNewProduct] = useState({ ...emptyProductForm });
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editProduct, setEditProduct] = useState({ ...emptyProductForm });
  const [quickProductEdits, setQuickProductEdits] = useState<Record<number, { price: string; stock: string }>>({});

  const isAdmin = user?.role === "admin";

  const dashboardQuery = trpc.admin.dashboard.useQuery(undefined, { enabled: isAuthenticated && isAdmin });
  const customersQuery = trpc.admin.usersList.useQuery(undefined, { enabled: isAuthenticated && isAdmin });
  const productsQuery = trpc.admin.productsList.useQuery(undefined, { enabled: isAuthenticated && isAdmin });
  const ordersQuery = trpc.admin.ordersList.useQuery(
    orderFilterStatus ? { status: orderFilterStatus as any } : undefined,
    { enabled: isAuthenticated && isAdmin },
  );
  const couponsQuery = trpc.admin.couponsList.useQuery(undefined, { enabled: isAuthenticated && isAdmin });
  const auditQuery = trpc.admin.auditList.useQuery({ limit: 200 }, { enabled: isAuthenticated && isAdmin });
  const backupsQuery = trpc.admin.backupsList.useQuery(undefined, { enabled: isAuthenticated && isAdmin });

  const setRoleMutation = trpc.admin.userSetRole.useMutation({
    onSuccess: () => {
      showToast({ message: "Role atualizada", duration: 2000 });
      void customersQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const setFlagsMutation = trpc.admin.userSetFlags.useMutation({
    onSuccess: () => {
      showToast({ message: "Cliente atualizado", duration: 2000 });
      void customersQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const createProductMutation = trpc.admin.productCreate.useMutation({
    onSuccess: () => {
      showToast({ message: "Produto criado", duration: 2000 });
      setNewProduct({ ...emptyProductForm });
      void productsQuery.refetch();
      void dashboardQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const updateProductMutation = trpc.admin.productUpdate.useMutation({
    onSuccess: () => {
      showToast({ message: "Produto atualizado", duration: 2000 });
      setEditingProductId(null);
      setEditProduct({ ...emptyProductForm });
      void productsQuery.refetch();
      void dashboardQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const quickUpdateProductMutation = trpc.admin.productUpdate.useMutation({
    onSuccess: () => {
      showToast({ message: "Produto atualizado", duration: 2000 });
      void productsQuery.refetch();
      void dashboardQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const deleteProductMutation = trpc.admin.productDelete.useMutation({
    onSuccess: () => {
      showToast({ message: "Produto removido", duration: 2000 });
      void productsQuery.refetch();
      void dashboardQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const updateOrderMutation = trpc.admin.orderUpdate.useMutation({
    onSuccess: () => {
      showToast({ message: "Pedido atualizado", duration: 2000 });
      void ordersQuery.refetch();
      void dashboardQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const couponCreateMutation = trpc.admin.couponCreate.useMutation({
    onSuccess: () => {
      showToast({ message: "Cupom criado", duration: 2000 });
      setNewCoupon({ code: "", type: "percent", value: "10", maxUses: "" });
      void couponsQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const couponDeleteMutation = trpc.admin.couponDelete.useMutation({
    onSuccess: () => {
      showToast({ message: "Cupom removido", duration: 2000 });
      void couponsQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const backupManualMutation = trpc.admin.backupManual.useMutation({
    onSuccess: data => {
      showToast({ message: `Backup criado: ${data.fileName}`, duration: 2600 });
      void backupsQuery.refetch();
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const backupRestoreMutation = trpc.admin.backupRestore.useMutation({
    onSuccess: () => {
      showToast({ message: "Backup restaurado", duration: 2600 });
      void Promise.all([
        customersQuery.refetch(),
        productsQuery.refetch(),
        ordersQuery.refetch(),
        couponsQuery.refetch(),
        auditQuery.refetch(),
      ]);
    },
    onError: error => showToast({ message: error.message, duration: 2600 }),
  });

  const reportQuery = trpc.admin.reportsSalesCsv.useQuery(
    { from: reportFrom || new Date(Date.now() - 7 * 86400000).toISOString(), to: reportTo || new Date().toISOString() },
    { enabled: false },
  );

  const customers = useMemo(() => [...(customersQuery.data ?? [])].sort((a, b) => b.id - a.id), [customersQuery.data]);
  const products = useMemo(() => [...(productsQuery.data ?? [])].sort((a, b) => b.id - a.id), [productsQuery.data]);
  const orders = useMemo(() => [...(ordersQuery.data ?? [])].sort((a, b) => b.id - a.id), [ordersQuery.data]);

  if (!isAuthenticated) {
    return (
      <div style={styles.centerCard}>
        <h1 style={styles.title}>Acesso negado</h1>
        <p style={styles.muted}>Faça login para acessar a área administrativa.</p>
        <button style={styles.primaryBtn} onClick={() => navigate("/login")}>Ir para login</button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={styles.centerCard}>
        <h1 style={styles.title}>Sem permissão</h1>
        <p style={styles.muted}>Esta área é exclusiva para administradores.</p>
        <button style={styles.primaryBtn} onClick={() => navigate("/")}>Voltar para início</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Painel Administrativo Seguro</h1>
      <p style={styles.muted}>Gestão completa de catálogo, pedidos, clientes, cupons, relatórios, auditoria e backup.</p>

      <div style={styles.tabs}>
        {[
          { key: "overview", label: "KPIs" },
          { key: "customers", label: "Clientes" },
          { key: "products", label: "Produtos" },
          { key: "orders", label: "Pedidos" },
          { key: "coupons", label: "Cupons" },
          { key: "reports", label: "Relatórios" },
          { key: "audit", label: "Auditoria" },
          { key: "backup", label: "Backup" },
        ].map(tab => (
          <button
            key={tab.key}
            style={{ ...styles.tabBtn, ...(section === tab.key ? styles.tabBtnActive : {}) }}
            onClick={() => setSection(tab.key as Section)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {section === "overview" && (
        <div style={styles.grid}>
          <div style={styles.kpiCard}><strong>Vendas Hoje</strong><span>R$ {((dashboardQuery.data?.salesToday ?? 0) / 100).toFixed(2)}</span></div>
          <div style={styles.kpiCard}><strong>Pedidos Pendentes</strong><span>{dashboardQuery.data?.pendingOrders ?? 0}</span></div>
          <div style={styles.kpiCard}><strong>Estoque Baixo</strong><span>{dashboardQuery.data?.lowStockCount ?? 0}</span></div>
          <div style={styles.kpiCard}><strong>Pedidos Hoje</strong><span>{dashboardQuery.data?.ordersToday ?? 0}</span></div>
        </div>
      )}

      {section === "customers" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Gestão de Clientes</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr><th>ID</th><th>Nome</th><th>Email</th><th>Role</th><th>Pedidos</th><th>VIP</th><th>Bloqueado</th><th>Ações</th></tr></thead>
              <tbody>
                {customers.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td><td>{row.name || "-"}</td><td>{row.email || "-"}</td><td>{row.role}</td><td>{row.ordersCount}</td>
                    <td>{row.isVip ? "Sim" : "Não"}</td><td>{row.isBlocked ? "Sim" : "Não"}</td>
                    <td style={styles.actionsCell}>
                      <button style={styles.smallBtn} onClick={() => setRoleMutation.mutate({ userId: row.id, role: row.role === "admin" ? "user" : "admin" })}>Role</button>
                      <button style={styles.smallBtn} onClick={() => setFlagsMutation.mutate({ userId: row.id, isVip: !row.isVip })}>{row.isVip ? "Rem VIP" : "VIP"}</button>
                      <button style={styles.dangerBtn} onClick={() => setFlagsMutation.mutate({ userId: row.id, isBlocked: !row.isBlocked })}>{row.isBlocked ? "Desbloq" : "Bloq"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === "products" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>CRUD de Produtos</h2>
          <div style={styles.formGrid}>
            <input style={styles.input} placeholder="Nome" value={newProduct.name} onChange={e => setNewProduct(prev => ({ ...prev, name: e.target.value }))} />
            <input style={styles.input} placeholder="Categoria" value={newProduct.category} onChange={e => setNewProduct(prev => ({ ...prev, category: e.target.value }))} />
            <input style={styles.input} placeholder="Preço (centavos)" value={newProduct.price} onChange={e => setNewProduct(prev => ({ ...prev, price: e.target.value }))} />
            <input style={styles.input} placeholder="Estoque" value={newProduct.stock} onChange={e => setNewProduct(prev => ({ ...prev, stock: e.target.value }))} />
            <input style={styles.input} placeholder="Imagem principal" value={newProduct.imageUrl} onChange={e => setNewProduct(prev => ({ ...prev, imageUrl: e.target.value }))} />
            <input style={styles.input} placeholder="Outras imagens CSV" value={newProduct.imagesCsv} onChange={e => setNewProduct(prev => ({ ...prev, imagesCsv: e.target.value }))} />
            <input style={styles.input} placeholder="Variantes CSV (nome|sku|preço|estoque;...)" value={newProduct.variantsCsv} onChange={e => setNewProduct(prev => ({ ...prev, variantsCsv: e.target.value }))} />
            <input style={styles.input} placeholder="Descrição" value={newProduct.description} onChange={e => setNewProduct(prev => ({ ...prev, description: e.target.value }))} />
          </div>
          <button
            style={styles.primaryBtn}
            onClick={() => {
              const price = Number(newProduct.price);
              const stock = Number(newProduct.stock);
              if (!newProduct.name.trim() || !newProduct.category.trim() || !Number.isFinite(price) || price <= 0) {
                showToast({ message: "Preencha nome/categoria/preço válidos", duration: 2400 });
                return;
              }

              const images = newProduct.imagesCsv
                .split(",")
                .map(item => item.trim())
                .filter(Boolean);

              const variants = newProduct.variantsCsv
                .split(";")
                .map(raw => raw.trim())
                .filter(Boolean)
                .map(raw => {
                  const [name, sku, variantPrice, variantStock] = raw.split("|").map(part => part?.trim() ?? "");
                  return {
                    name,
                    sku: sku || null,
                    price: variantPrice ? Number(variantPrice) : null,
                    stock: Number(variantStock || "0"),
                  };
                })
                .filter(item => item.name && Number.isFinite(item.stock));

              createProductMutation.mutate({
                name: newProduct.name.trim(),
                category: newProduct.category.trim(),
                price,
                stock: Number.isFinite(stock) && stock >= 0 ? stock : 0,
                imageUrl: newProduct.imageUrl.trim() || undefined,
                images,
                variants,
                description: newProduct.description.trim() || undefined,
              });
            }}
          >
            Criar Produto
          </button>

          <h3 style={styles.sectionTitle}>Editar Produto</h3>
          <div style={styles.inlineRow}>
            <select
              style={styles.select}
              value={editingProductId ?? ""}
              onChange={e => {
                const nextId = Number(e.target.value);
                if (!Number.isFinite(nextId) || nextId <= 0) {
                  setEditingProductId(null);
                  setEditProduct({ ...emptyProductForm });
                  return;
                }

                const selected = products.find(product => product.id === nextId);
                if (!selected) {
                  setEditingProductId(null);
                  setEditProduct({ ...emptyProductForm });
                  return;
                }

                setEditingProductId(selected.id);
                setEditProduct({
                  name: selected.name ?? "",
                  category: selected.category ?? "",
                  price: String(selected.price ?? ""),
                  stock: String(selected.stock ?? 0),
                  imageUrl: selected.imageUrl ?? "",
                  imagesCsv: (selected.images ?? [])
                    .map(item => (typeof item === "string" ? item : item?.imageUrl ?? ""))
                    .filter(Boolean)
                    .join(", "),
                  variantsCsv: (selected.variants ?? [])
                    .map(item => {
                      const name = item?.name ?? "";
                      const sku = item?.sku ?? "";
                      const variantPrice = item?.price ?? "";
                      const variantStock = item?.stock ?? 0;
                      return `${name}|${sku}|${variantPrice}|${variantStock}`;
                    })
                    .filter(Boolean)
                    .join("; "),
                  description: selected.description ?? "",
                });
              }}
            >
              <option value="">Selecione um produto</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  #{product.id} - {product.name}
                </option>
              ))}
            </select>
          </div>

          {editingProductId ? (
            <>
              <div style={styles.formGrid}>
                <input style={styles.input} placeholder="Nome" value={editProduct.name} onChange={e => setEditProduct(prev => ({ ...prev, name: e.target.value }))} />
                <input style={styles.input} placeholder="Categoria" value={editProduct.category} onChange={e => setEditProduct(prev => ({ ...prev, category: e.target.value }))} />
                <input style={styles.input} placeholder="Preço (centavos)" value={editProduct.price} onChange={e => setEditProduct(prev => ({ ...prev, price: e.target.value }))} />
                <input style={styles.input} placeholder="Estoque" value={editProduct.stock} onChange={e => setEditProduct(prev => ({ ...prev, stock: e.target.value }))} />
                <input style={styles.input} placeholder="Imagem principal" value={editProduct.imageUrl} onChange={e => setEditProduct(prev => ({ ...prev, imageUrl: e.target.value }))} />
                <input style={styles.input} placeholder="Outras imagens CSV" value={editProduct.imagesCsv} onChange={e => setEditProduct(prev => ({ ...prev, imagesCsv: e.target.value }))} />
                <input style={styles.input} placeholder="Variantes CSV (nome|sku|preço|estoque;...)" value={editProduct.variantsCsv} onChange={e => setEditProduct(prev => ({ ...prev, variantsCsv: e.target.value }))} />
                <input style={styles.input} placeholder="Descrição" value={editProduct.description} onChange={e => setEditProduct(prev => ({ ...prev, description: e.target.value }))} />
              </div>
              <div style={styles.inlineRow}>
                <button
                  style={styles.primaryBtn}
                  onClick={() => {
                    if (!editingProductId) return;

                    const price = Number(editProduct.price);
                    const stock = Number(editProduct.stock);
                    if (!editProduct.name.trim() || !editProduct.category.trim() || !Number.isFinite(price) || price <= 0) {
                      showToast({ message: "Preencha nome/categoria/preço válidos", duration: 2400 });
                      return;
                    }

                    const images = editProduct.imagesCsv
                      .split(",")
                      .map(item => item.trim())
                      .filter(Boolean);

                    const variants = editProduct.variantsCsv
                      .split(";")
                      .map(raw => raw.trim())
                      .filter(Boolean)
                      .map(raw => {
                        const [name, sku, variantPrice, variantStock] = raw.split("|").map(part => part?.trim() ?? "");
                        return {
                          name,
                          sku: sku || null,
                          price: variantPrice ? Number(variantPrice) : null,
                          stock: Number(variantStock || "0"),
                        };
                      })
                      .filter(item => item.name && Number.isFinite(item.stock));

                    updateProductMutation.mutate({
                      id: editingProductId,
                      name: editProduct.name.trim(),
                      category: editProduct.category.trim(),
                      price,
                      stock: Number.isFinite(stock) && stock >= 0 ? stock : 0,
                      imageUrl: editProduct.imageUrl.trim() || undefined,
                      images,
                      variants,
                      description: editProduct.description.trim() || undefined,
                    });
                  }}
                >
                  Salvar Edição
                </button>
                <button
                  style={styles.smallBtn}
                  onClick={() => {
                    setEditingProductId(null);
                    setEditProduct({ ...emptyProductForm });
                  }}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : null}

          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr><th>ID</th><th>Nome</th><th>Categoria</th><th>Preço (centavos)</th><th>Estoque</th><th>Imagens</th><th>Variantes</th><th>Ação</th></tr></thead>
              <tbody>
                {products.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td><td>{row.name}</td><td>{row.category}</td>
                    <td>
                      <input
                        style={{ ...styles.input, width: 130 }}
                        value={quickProductEdits[row.id]?.price ?? String(row.price)}
                        onChange={e => {
                          const value = e.target.value;
                          setQuickProductEdits(prev => ({
                            ...prev,
                            [row.id]: {
                              price: value,
                              stock: prev[row.id]?.stock ?? String(row.stock),
                            },
                          }));
                        }}
                      />
                    </td>
                    <td>
                      <input
                        style={{ ...styles.input, width: 90 }}
                        value={quickProductEdits[row.id]?.stock ?? String(row.stock)}
                        onChange={e => {
                          const value = e.target.value;
                          setQuickProductEdits(prev => ({
                            ...prev,
                            [row.id]: {
                              price: prev[row.id]?.price ?? String(row.price),
                              stock: value,
                            },
                          }));
                        }}
                      />
                    </td>
                    <td>{row.images?.length ?? 0}</td><td>{row.variants?.length ?? 0}</td>
                    <td style={styles.actionsCell}>
                      <button
                        style={styles.smallBtn}
                        onClick={() => {
                          const price = Number(quickProductEdits[row.id]?.price ?? row.price);
                          const stock = Number(quickProductEdits[row.id]?.stock ?? row.stock);
                          if (!Number.isFinite(price) || price <= 0 || !Number.isFinite(stock) || stock < 0) {
                            showToast({ message: "Preço/estoque inválidos", duration: 2400 });
                            return;
                          }
                          quickUpdateProductMutation.mutate(
                            { id: row.id, price, stock },
                            {
                              onSuccess: () => {
                                setQuickProductEdits(prev => {
                                  const next = { ...prev };
                                  delete next[row.id];
                                  return next;
                                });
                              },
                            },
                          );
                        }}
                      >
                        Salvar rápido
                      </button>
                      <button
                        style={styles.smallBtn}
                        onClick={() => {
                          setEditingProductId(row.id);
                          setEditProduct({
                            name: row.name ?? "",
                            category: row.category ?? "",
                            price: String(row.price ?? ""),
                            stock: String(row.stock ?? 0),
                            imageUrl: row.imageUrl ?? "",
                            imagesCsv: (row.images ?? [])
                              .map(item => (typeof item === "string" ? item : item?.imageUrl ?? ""))
                              .filter(Boolean)
                              .join(", "),
                            variantsCsv: (row.variants ?? [])
                              .map(item => {
                                const name = item?.name ?? "";
                                const sku = item?.sku ?? "";
                                const variantPrice = item?.price ?? "";
                                const variantStock = item?.stock ?? 0;
                                return `${name}|${sku}|${variantPrice}|${variantStock}`;
                              })
                              .filter(Boolean)
                              .join("; "),
                            description: row.description ?? "",
                          });
                        }}
                      >
                        Editar
                      </button>
                      <button style={styles.dangerBtn} onClick={() => deleteProductMutation.mutate({ id: row.id })}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === "orders" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Pedidos</h2>
          <div style={styles.inlineRow}>
            <label>Status:</label>
            <select style={styles.select} value={orderFilterStatus} onChange={e => setOrderFilterStatus(e.target.value)}>
              <option value="">Todos</option>
              {orderStatuses.map(status => <option key={status} value={status}>{status}</option>)}
            </select>
            <button style={styles.smallBtn} onClick={() => ordersQuery.refetch()}>Filtrar</button>
          </div>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr><th>ID</th><th>Cliente</th><th>Total</th><th>Status</th><th>Rastreio</th><th>Itens</th><th>Ações</th></tr></thead>
              <tbody>
                {orders.map(row => (
                  <tr key={row.id}>
                    <td>{row.id}</td><td>{row.userId}</td><td>R$ {(row.totalPrice / 100).toFixed(2)}</td><td>{row.status}</td><td>{row.trackingCode || "-"}</td>
                    <td>{row.items?.length ?? 0}</td>
                    <td style={styles.actionsCell}>
                      <select
                        style={styles.select}
                        value={row.status}
                        onChange={e => updateOrderMutation.mutate({ orderId: row.id, status: e.target.value as any })}
                      >
                        {orderStatuses.map(status => <option key={status} value={status}>{status}</option>)}
                      </select>
                      <button
                        style={styles.smallBtn}
                        onClick={() => {
                          const tracking = window.prompt("Número de rastreio:", row.trackingCode || "");
                          if (tracking === null) return;
                          updateOrderMutation.mutate({ orderId: row.id, trackingCode: tracking || null });
                        }}
                      >
                        Rastreio
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === "coupons" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Cupons e Descontos</h2>
          <div style={styles.inlineRow}>
            <input style={styles.input} placeholder="Código" value={newCoupon.code} onChange={e => setNewCoupon(prev => ({ ...prev, code: e.target.value }))} />
            <select style={styles.select} value={newCoupon.type} onChange={e => setNewCoupon(prev => ({ ...prev, type: e.target.value }))}>
              <option value="percent">percent</option>
              <option value="fixed">fixed</option>
            </select>
            <input style={styles.input} placeholder="Valor" value={newCoupon.value} onChange={e => setNewCoupon(prev => ({ ...prev, value: e.target.value }))} />
            <input style={styles.input} placeholder="Max usos" value={newCoupon.maxUses} onChange={e => setNewCoupon(prev => ({ ...prev, maxUses: e.target.value }))} />
            <button
              style={styles.primaryBtn}
              onClick={() => {
                couponCreateMutation.mutate({
                  code: newCoupon.code,
                  type: newCoupon.type as any,
                  value: Number(newCoupon.value),
                  maxUses: newCoupon.maxUses ? Number(newCoupon.maxUses) : null,
                });
              }}
            >
              Criar Cupom
            </button>
          </div>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr><th>ID</th><th>Código</th><th>Tipo</th><th>Valor</th><th>Usos</th><th>Ativo</th><th>Ação</th></tr></thead>
              <tbody>
                {(couponsQuery.data ?? []).map(coupon => (
                  <tr key={coupon.id}>
                    <td>{coupon.id}</td><td>{coupon.code}</td><td>{coupon.type}</td><td>{coupon.value}</td><td>{coupon.usedCount}/{coupon.maxUses ?? "∞"}</td><td>{coupon.isActive ? "Sim" : "Não"}</td>
                    <td><button style={styles.dangerBtn} onClick={() => couponDeleteMutation.mutate({ id: coupon.id })}>Excluir</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === "reports" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Relatórios</h2>
          <div style={styles.inlineRow}>
            <input type="datetime-local" style={styles.input} value={reportFrom} onChange={e => setReportFrom(e.target.value)} />
            <input type="datetime-local" style={styles.input} value={reportTo} onChange={e => setReportTo(e.target.value)} />
            <button
              style={styles.primaryBtn}
              onClick={async () => {
                const fromIso = reportFrom ? new Date(reportFrom).toISOString() : new Date(Date.now() - 7 * 86400000).toISOString();
                const toIso = reportTo ? new Date(reportTo).toISOString() : new Date().toISOString();
                const data = await reportQuery.refetch({ throwOnError: true });
                const csvPayload = data.data ?? (await utils.admin.reportsSalesCsv.fetch({ from: fromIso, to: toIso }));
                const blob = new Blob([csvPayload.csv], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = csvPayload.fileName;
                a.click();
                URL.revokeObjectURL(url);
                showToast({ message: "CSV exportado", duration: 2200 });
              }}
            >
              Exportar CSV
            </button>
          </div>
        </div>
      )}

      {section === "audit" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Logs de Auditoria</h2>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr><th>Quando</th><th>Usuário</th><th>Ação</th><th>Entidade</th><th>ID</th><th>Meta</th></tr></thead>
              <tbody>
                {(auditQuery.data ?? []).map(log => (
                  <tr key={log.id}>
                    <td>{new Date(log.createdAt).toLocaleString("pt-BR")}</td>
                    <td>{log.actorUserId}</td>
                    <td>{log.action}</td>
                    <td>{log.entity}</td>
                    <td>{log.entityId || "-"}</td>
                    <td>{log.metadata ? JSON.stringify(log.metadata).slice(0, 100) : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {section === "backup" && (
        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Backup e Restauração</h2>
          <div style={styles.inlineRow}>
            <button style={styles.primaryBtn} onClick={() => backupManualMutation.mutate()}>Backup Manual</button>
            <input style={styles.input} placeholder="arquivo backup.json" value={restoreFileName} onChange={e => setRestoreFileName(e.target.value)} />
            <button
              style={styles.dangerBtn}
              onClick={() => {
                if (!restoreFileName.trim()) {
                  showToast({ message: "Informe o nome do arquivo de backup", duration: 2300 });
                  return;
                }
                if (!window.confirm("Restaurar backup substitui dados atuais. Continuar?")) return;
                backupRestoreMutation.mutate({ fileName: restoreFileName.trim() });
              }}
            >
              Restaurar
            </button>
          </div>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead><tr><th>Arquivos disponíveis</th></tr></thead>
              <tbody>
                {(backupsQuery.data ?? []).map(file => (
                  <tr key={file}><td>{file}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  centerCard: {
    maxWidth: 520,
    margin: "0 auto",
    padding: 20,
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 12,
    alignItems: "flex-start",
  },
  title: {
    margin: 0,
    color: "#111827",
  },
  muted: {
    margin: 0,
    color: "#6b7280",
  },
  tabs: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
  },
  tabBtn: {
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    borderRadius: 8,
    padding: "8px 12px",
    cursor: "pointer",
  },
  tabBtnActive: {
    background: "#111827",
    color: "#fff",
    borderColor: "#111827",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  kpiCard: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 16,
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    background: "#fff",
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  sectionTitle: {
    margin: 0,
    color: "#111827",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 8,
  },
  inlineRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    alignItems: "center",
  },
  input: {
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "8px 10px",
  },
  select: {
    border: "1px solid #d1d5db",
    borderRadius: 8,
    padding: "6px 8px",
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  actionsCell: {
    display: "flex",
    gap: 6,
    flexWrap: "wrap",
  },
  smallBtn: {
    border: "1px solid #111827",
    background: "#fff",
    color: "#111827",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
  },
  primaryBtn: {
    border: "1px solid #111827",
    background: "#111827",
    color: "#fff",
    borderRadius: 8,
    padding: "8px 12px",
    cursor: "pointer",
  },
  dangerBtn: {
    border: "1px solid #dc2626",
    background: "#fff",
    color: "#dc2626",
    borderRadius: 8,
    padding: "6px 10px",
    cursor: "pointer",
  },
};
