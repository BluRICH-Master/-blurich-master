f = r'C:\Users\Lenovo\Desktop\BluRICHMaster\app\master\orders\[id]\page.tsx'
with open(f, 'r', encoding='utf-8') as file:
    content = file.read()

# справляем addSvc - добавляем проверку order и пересчёт суммы
old_addSvc = """const addSvc = async () => {
    if (!selSvcId) return;
    const s = allServices.find(x => x.id === Number(selSvcId));
    if (!s) return;
    await supabase.from("order_services").insert({ order_id: orderId, service_id: Number(selSvcId), quantity: selSvcQty, price: s.price || 0, company_id: order.company_id });
    setShowSvcModal(false); setSelSvcId(""); setSelSvcQty(1); setSvcSearch("");
    loadData();
  };"""

new_addSvc = """const addSvc = async () => {
    if (!selSvcId || !order) return;
    const s = allServices.find(x => x.id === Number(selSvcId));
    if (!s) return;
    const { error } = await supabase.from("order_services").insert({ order_id: orderId, service_id: Number(selSvcId), quantity: selSvcQty, price: s.price || 0, company_id: order.company_id });
    if (error) { alert("Error: " + error.message); return; }
    const svcTotal = (s.price || 0) * selSvcQty;
    const newTotal = (order.total_amount || 0) + svcTotal;
    await supabase.from("orders").update({ total_amount: newTotal }).eq("id", orderId);
    setShowSvcModal(false); setSelSvcId(""); setSelSvcQty(1); setSvcSearch("");
    loadData();
  };"""

content = content.replace(old_addSvc, new_addSvc)

# справляем addInv - добавляем проверку order и пересчёт суммы
old_addInv = """const addInv = async () => {
    if (!selInvId) return;
    const i = allInventory.find(x => x.id === Number(selInvId));
    if (!i) return;
    await supabase.from("order_inventory").insert({ order_id: orderId, inventory_id: Number(selInvId), quantity: selInvQty, price: i.sale_price || 0, company_id: order.company_id });
    setShowInvModal(false); setSelInvId(""); setSelInvQty(1); setInvSearch("");
    loadData();
  };"""

new_addInv = """const addInv = async () => {
    if (!selInvId || !order) return;
    const i = allInventory.find(x => x.id === Number(selInvId));
    if (!i) return;
    const { error } = await supabase.from("order_inventory").insert({ order_id: orderId, inventory_id: Number(selInvId), quantity: selInvQty, price: i.sale_price || 0, company_id: order.company_id });
    if (error) { alert("Error: " + error.message); return; }
    const invTotal = (i.sale_price || 0) * selInvQty;
    const newTotal = (order.total_amount || 0) + invTotal;
    await supabase.from("orders").update({ total_amount: newTotal }).eq("id", orderId);
    setShowInvModal(false); setSelInvId(""); setSelInvQty(1); setInvSearch("");
    loadData();
  };"""

content = content.replace(old_addInv, new_addInv)

# справляем remSvc - добавляем пересчёт суммы
old_remSvc = """const remSvc = async (id: number) => {
    if (order?.status === "completed") return;
    await supabase.from("order_services").delete().eq("id", id);
    loadData();
  };"""

new_remSvc = """const remSvc = async (id: number) => {
    if (order?.status === "completed" || !order) return;
    const svc = services.find(s => s.id === id);
    if (svc) {
      const svcTotal = (svc.price || 0) * svc.quantity;
      const newTotal = Math.max(0, (order.total_amount || 0) - svcTotal);
      await supabase.from("orders").update({ total_amount: newTotal }).eq("id", orderId);
    }
    await supabase.from("order_services").delete().eq("id", id);
    loadData();
  };"""

content = content.replace(old_remSvc, new_remSvc)

# справляем remInv - добавляем пересчёт суммы
old_remInv = """const remInv = async (id: number) => {
    if (order?.status === "completed") return;
    await supabase.from("order_inventory").delete().eq("id", id);
    loadData();
  };"""

new_remInv = """const remInv = async (id: number) => {
    if (order?.status === "completed" || !order) return;
    const inv = inventory.find(i => i.id === id);
    if (inv) {
      const invTotal = (inv.price || 0) * inv.quantity;
      const newTotal = Math.max(0, (order.total_amount || 0) - invTotal);
      await supabase.from("orders").update({ total_amount: newTotal }).eq("id", orderId);
    }
    await supabase.from("order_inventory").delete().eq("id", id);
    loadData();
  };"""

content = content.replace(old_remInv, new_remInv)

with open(f, 'w', encoding='utf-8') as file:
    file.write(content)
print('Fixed!')