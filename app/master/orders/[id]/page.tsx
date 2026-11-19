"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function MasterOrderPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = Number(params.id);
  const [order, setOrder] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [inventory, setInventory] = useState<any[]>([]);
  const [allServices, setAllServices] = useState<any[]>([]);
  const [allInventory, setAllInventory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showSvcModal, setShowSvcModal] = useState(false);
  const [selSvcId, setSelSvcId] = useState("");
  const [selSvcQty, setSelSvcQty] = useState(1);
  const [svcSearch, setSvcSearch] = useState("");

  const [showInvModal, setShowInvModal] = useState(false);
  const [selInvId, setSelInvId] = useState("");
  const [selInvQty, setSelInvQty] = useState(1);
  const [invSearch, setInvSearch] = useState("");

  const [showConsModal, setShowConsModal] = useState(false);
  const [selConsId, setSelConsId] = useState("");
  const [selConsQty, setSelConsQty] = useState(1);
  const [consSearch, setConsSearch] = useState("");

  const [showBreakdownModal, setShowBreakdownModal] = useState(false);
  const [breakdownDesc, setBreakdownDesc] = useState("");

  useEffect(() => { if (orderId) loadData(); }, [orderId]);

  const loadData = async () => {
    setLoading(true);
    const { data: o } = await supabase.from("orders").select("*").eq("id", orderId).single();
    setOrder(o);
    const { data: sv } = await supabase.from("order_services").select("*, services(name)").eq("order_id", orderId);
    setServices(sv || []);
    const { data: iv } = await supabase.from("order_inventory").select("*, inventory(id, name, is_consumable, quantity)").eq("order_id", orderId);
    setInventory(iv || []);
    if (o?.company_id) {
      const { data: as2 } = await supabase.from("services").select("*").eq("company_id", o.company_id);
      setAllServices(as2 || []);
      const { data: ai } = await supabase.from("inventory").select("*").eq("company_id", o.company_id);
      setAllInventory(ai || []);
    }
    setLoading(false);
  };

  const addSvc = async () => {
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
  };

  const addInv = async () => {
    if (!selInvId || !order) return;
    const i = allInventory.find(x => x.id === Number(selInvId));
    if (!i) return;
    const { error } = await supabase.from("order_inventory").insert({ order_id: orderId, inventory_id: Number(selInvId), quantity: selInvQty, price: i.sale_price || 0, company_id: order.company_id });
    if (error) { alert("Error: " + error.message); return; }
  await supabase.from("inventory").update({ quantity: i.quantity - selInvQty }).eq("id", Number(selInvId));
    const invTotal = (i.sale_price || 0) * selInvQty;
    const newTotal = (order.total_amount || 0) + invTotal;
    await supabase.from("orders").update({ total_amount: newTotal }).eq("id", orderId);
    setShowInvModal(false); setSelInvId(""); setSelInvQty(1); setInvSearch("");
    loadData();
  };

  const addCons = async () => {
    if (!selConsId || !order) return;
    const c = allInventory.find(x => x.id === Number(selConsId));
    if (!c) return;
    const { error } = await supabase.from("order_inventory").insert({ order_id: orderId, inventory_id: Number(selConsId), quantity: selConsQty, price: 0, company_id: order.company_id });
    if (error) { alert("Error: " + error.message); return; }
  await supabase.from("inventory").update({ quantity: c.quantity - selConsQty }).eq("id", Number(selConsId));
    setShowConsModal(false); setSelConsId(""); setSelConsQty(1); setConsSearch("");
    loadData();
  };

  const remSvc = async (id: number) => {
    if (order?.status === "completed" || !order) return;
  if (!confirm("Удалить услугу?")) return;
    const svc = services.find(s => s.id === id);
    if (svc) {
      const svcTotal = (svc.price || 0) * svc.quantity;
      const newTotal = Math.max(0, (order.total_amount || 0) - svcTotal);
      await supabase.from("orders").update({ total_amount: newTotal }).eq("id", orderId);
    }
    await supabase.from("order_services").delete().eq("id", id);
    loadData();
  };

  const remInv = async (id: number) => {
  if (order?.status === "completed" || !order) return;
  if (!confirm("Удалить позицию?")) return;
  const inv = inventory.find(i => i.id === id);
  if (inv) {
    const invTotal = (inv.price || 0) * inv.quantity;
    const newTotal = Math.max(0, (order.total_amount || 0) - invTotal);
    await supabase.from("orders").update({ total_amount: newTotal }).eq("id", orderId);
    const { data: invData } = await supabase.from("inventory").select("quantity").eq("id", inv.inventory_id).single();
    if (invData) {
      const newQty = (invData.quantity || 0) + inv.quantity;
      await supabase.from("inventory").update({ quantity: newQty }).eq("id", inv.inventory_id);
    }
  }
  await supabase.from("order_inventory").delete().eq("id", id);
  loadData();
};

const reportBreakdown = async () => {
    if (!breakdownDesc.trim() || !order) return;
    const { error } = await supabase.from("equipment_breakdowns").insert({
      order_id: orderId,
      master_id: order.master_id,
      company_id: order.company_id,
      description: breakdownDesc,
      status: 'reported'
    });
    if (error) { alert("Error: " + error.message); return; }
    setShowBreakdownModal(false);
    setBreakdownDesc("");
    alert("Сообщение о поломке отправлено администратору");
  };

  const acceptOrder = async () => {
    await supabase.from("orders").update({ status: "in_progress" }).eq("id", orderId);
    loadData();
  };

  const completeOrder = async () => {
    const { data: master } = await supabase.from('masters').select('commission_percent').eq('id', order.master_id).single();
    const commissionPercent = master?.commission_percent || 60;
    const { data: svcs } = await supabase.from('order_services').select('*').eq('order_id', orderId);
    const servicesTotal = (svcs || []).reduce((sum, s) => sum + ((s.price || 0) * (s.quantity || 1)), 0);
    const earnings = servicesTotal * (commissionPercent / 100);
    await supabase.from('orders').update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      master_earnings: earnings
    }).eq('id', orderId);
    loadData();
  };

  const isDone = order?.status === "completed";
  const fSvc = allServices.filter(s => s.name?.toLowerCase().includes(svcSearch.toLowerCase()));
  const fInv = allInventory.filter(i => !i.is_consumable && i.name?.toLowerCase().includes(invSearch.toLowerCase()));
  const fCons = allInventory.filter(i => i.is_consumable && i.name?.toLowerCase().includes(consSearch.toLowerCase()));

  if (loading) return <div className="p-8 text-center">Загрузка...</div>;
  if (!order) return <div className="p-8 text-center">Не найдено</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button onClick={() => router.back()} className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">Назад</button>
      <h1 className="text-2xl font-bold mb-4">Заявка #{order.id}</h1>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <p><strong>Организация:</strong> {order.organization_name || "-"}</p>
        <p><strong>Контакт:</strong> {order.contact_name || "-"}</p>
        <p><strong>Телефон:</strong> {order.contact_phone || "-"}</p>
        <p><strong>Адрес:</strong> {order.address || "-"}</p>
        <p><strong>Статус:</strong> {order.status}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Услуги</h2>
          {!isDone && <button onClick={() => setShowSvcModal(true)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">+ Добавить</button>}
        </div>
        {services.length === 0 ? <p className="text-gray-500">Услуги не добавлены</p> : (
          <ul className="space-y-2">{services.map(s => (
            <li key={s.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{s.services?.name || "?"} x {s.quantity}</span>
              {!isDone && <button onClick={() => remSvc(s.id)} className="text-red-600 text-sm">Удалить</button>}
            </li>))}</ul>)}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Материалы</h2>
          {!isDone && <button onClick={() => setShowInvModal(true)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">+ Добавить</button>}
        </div>
        {inventory.filter(i => !i.inventory?.is_consumable).length === 0 ? <p className="text-gray-500">Материалы не добавлены</p> : (
          <ul className="space-y-2">{inventory.filter(i => !i.inventory?.is_consumable).map(i => (
            <li key={i.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <span>{i.inventory?.name || "?"} x {i.quantity}</span>
              {!isDone && <button onClick={() => remInv(i.id)} className="text-red-600 text-sm">Удалить</button>}
            </li>))}</ul>)}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4 border-l-4 border-yellow-400">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Расходники</h2>
          {!isDone && <button onClick={() => setShowConsModal(true)} className="bg-yellow-600 text-white px-3 py-1 rounded text-sm">+ Добавить расходник</button>}
        </div>
        {inventory.filter(i => i.inventory?.is_consumable).length === 0 ? <p className="text-gray-500">Расходники не добавлены</p> : (
          <ul className="space-y-2">{inventory.filter(i => i.inventory?.is_consumable).map(i => (
            <li key={i.id} className="flex justify-between items-center bg-yellow-50 p-2 rounded">
              <span>{i.inventory?.name || "?"} x {i.quantity}</span>
              {!isDone && <button onClick={() => remInv(i.id)} className="text-red-600 text-sm">Удалить</button>}
            </li>))}</ul>)}
      </div>

      <div className="flex gap-2 mb-4">
        {order.status === "assigned" && <button onClick={acceptOrder} className="flex-1 bg-blue-600 text-white py-3 rounded-lg">Принять</button>}
        {order.status === "in_progress" && <button onClick={completeOrder} className="flex-1 bg-green-600 text-white py-3 rounded-lg">Завершить</button>}
        {!isDone && (
          <button onClick={() => setShowBreakdownModal(true)} className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold">Поломка оборудования</button>
        )}
      </div>

      {showSvcModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">Добавить услугу</h3>
            <input type="text" placeholder="Поиск..." value={svcSearch} onChange={e => setSvcSearch(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
            <select value={selSvcId} onChange={e => setSelSvcId(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">
              <option value="">Выбрать</option>
              {fSvc.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <input type="number" min="1" value={selSvcQty} onChange={e => setSelSvcQty(Number(e.target.value))} className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex gap-2">
              <button onClick={addSvc} className="flex-1 bg-blue-600 text-white py-2 rounded">Добавить</button>
              <button onClick={() => setShowSvcModal(false)} className="flex-1 bg-gray-300 py-2 rounded">Отмена</button>
            </div>
          </div>
        </div>
      )}

      {showInvModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">Добавить материал</h3>
            <input type="text" placeholder="Поиск..." value={invSearch} onChange={e => setInvSearch(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
            <select value={selInvId} onChange={e => setSelInvId(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">
              <option value="">Выбрать</option>
              {fInv.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
            <input type="number" min="1" value={selInvQty} onChange={e => setSelInvQty(Number(e.target.value))} className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex gap-2">
              <button onClick={addInv} className="flex-1 bg-blue-600 text-white py-2 rounded">Добавить</button>
              <button onClick={() => setShowInvModal(false)} className="flex-1 bg-gray-300 py-2 rounded">Отмена</button>
            </div>
          </div>
        </div>
      )}

      {showConsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3">Добавить расходник</h3>
            <input type="text" placeholder="Поиск..." value={consSearch} onChange={e => setConsSearch(e.target.value)} className="w-full border rounded px-3 py-2 mb-3" />
            <select value={selConsId} onChange={e => setSelConsId(e.target.value)} className="w-full border rounded px-3 py-2 mb-3">
              <option value="">Выбрать</option>
              {fCons.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
            <input type="number" min="1" value={selConsQty} onChange={e => setSelConsQty(Number(e.target.value))} className="w-full border rounded px-3 py-2 mb-3" />
            <div className="flex gap-2">
              <button onClick={addCons} className="flex-1 bg-yellow-600 text-white py-2 rounded">Добавить</button>
              <button onClick={() => setShowConsModal(false)} className="flex-1 bg-gray-300 py-2 rounded">Отмена</button>
            </div>
          </div>
        </div>
      )}

      {showBreakdownModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-3 text-red-600">Сообщить о поломке</h3>
            <p className="text-sm text-gray-600 mb-3">Опишите, что случилось (например: "сгорела дрель", "сломалось сверло"). Администратор увидит это сообщение.</p>
            <textarea
              value={breakdownDesc}
              onChange={e => setBreakdownDesc(e.target.value)}
              placeholder="Что сломалось и при каких обстоятельствах?"
              className="w-full border rounded px-3 py-2 mb-3 h-24"
            />
            <div className="flex gap-2">
              <button onClick={reportBreakdown} className="flex-1 bg-red-600 text-white py-2 rounded">Отправить</button>
              <button onClick={() => { setShowBreakdownModal(false); setBreakdownDesc(""); }} className="flex-1 bg-gray-300 py-2 rounded">Отмена</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
