"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  LifeBuoy,
  Sparkles,
  Ticket,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type TicketStatus = "active" | "resolved" | "processing" | "new";

type TicketItem = {
  id: number;
  ticketNumber: string;
  issueType: string;
  description: string;
  userName: string;
  date: string;
  status: TicketStatus;
  email?: string;
};

type FilterType = "active" | "resolved" | "processing" | "new";

export default function SupportDashboardPage() {
  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [activeTab, setActiveTab] = useState<FilterType>("active");
  const [selectedTicket, setSelectedTicket] = useState<TicketItem | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/support-tickets")
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((item: any) => ({
          id: Number(item.ticket_id),
          ticketNumber: String(item.ticket_id),
          issueType: item.issue_type,
          description: item.description,
          userName: "مستخدم",
          date: item.created_at
            ? new Date(item.created_at).toLocaleDateString("ar-SA")
            : "",
          status:
            item.status === "OPEN"
              ? "active"
              : item.status === "IN_PROGRESS"
              ? "processing"
              : item.status === "RESOLVED"
              ? "resolved"
              : "new",
        }));

        setTickets(mapped);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => ticket.status === activeTab);
  }, [tickets, activeTab]);

  const resolvedCount = tickets.filter((ticket) => ticket.status === "resolved").length;
  const processingCount = tickets.filter((ticket) => ticket.status === "processing").length;
  const totalCount = tickets.length;

  const getStatusUI = (status: TicketStatus) => {
    switch (status) {
      case "resolved":
        return {
          className: "success",
          icon: <CheckCircle2 size={14} />,
          label: "تم الحل",
        };
      case "processing":
        return {
          className: "danger",
          icon: <AlertCircle size={14} />,
          label: "قيد المعالجة",
        };
      case "new":
        return {
          className: "primary",
          icon: <Ticket size={14} />,
          label: "جديد",
        };
      case "active":
      default:
        return {
          className: "warning",
          icon: <Clock3 size={14} />,
          label: "نشطة",
        };
    }
  };

  const updateTicketStatus = (ticketId: number, newStatus: TicketStatus) => {
    const backendStatus =
      newStatus === "active"
        ? "OPEN"
        : newStatus === "processing"
        ? "IN_PROGRESS"
        : newStatus === "resolved"
        ? "RESOLVED"
        : "OPEN";

    fetch(`http://localhost:8080/api/support-tickets/${ticketId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: backendStatus,
      }),
    })
      .then(() => {
        const updatedTickets = tickets.map((ticket) =>
          ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
        );

        setTickets(updatedTickets);

        const updatedSelected =
          updatedTickets.find((ticket) => ticket.id === ticketId) || null;

        setSelectedTicket(updatedSelected);
      })
      .catch((err) => console.error(err));
  };

  return (
    <MobileChrome>
      <div className="epic-support-shell" dir="rtl">
        <div className="epic-support-header">
          <div className="epic-support-badge">
            <Sparkles size={14} />
            مركز المتابعة التقنية
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <h1 className="epic-support-title">لوحة الدعم التقني</h1>

          <p className="epic-support-subtitle">
            راقب حالة التذاكر، تابع القضايا المفتوحة، واستعرض أداء الدعم الفني
            من خلال لوحة احترافية مصممة لسرعة المعالجة ووضوح المتابعة.
          </p>
        </div>

        <div className="epic-support-hero-card">
          <div className="epic-support-hero-glow" />

          <div className="epic-support-hero-top">
            <div className="epic-support-hero-icon">
              <LifeBuoy size={24} />
            </div>

            <div>
              <div className="epic-support-hero-heading">متابعة حية للتذاكر</div>
              <div className="epic-support-hero-text">
                نظرة فورية على حالة البلاغات التقنية وسرعة الاستجابة
              </div>
            </div>
          </div>
        </div>

        <div className="epic-support-summary-grid">
          <div className="epic-support-summary-card success">
            <div className="epic-support-summary-top">
              <div className="epic-support-summary-dot success" />
              <div className="epic-support-summary-label">تم الحل</div>
            </div>
            <div className="epic-support-summary-number">{resolvedCount}</div>
          </div>

          <div className="epic-support-summary-card danger">
            <div className="epic-support-summary-top">
              <div className="epic-support-summary-dot danger" />
              <div className="epic-support-summary-label">قيد المعالجة</div>
            </div>
            <div className="epic-support-summary-number">{processingCount}</div>
          </div>
        </div>

        <div className="epic-support-summary-card warning full">
          <div className="epic-support-summary-top">
            <div className="epic-support-summary-dot warning" />
            <div className="epic-support-summary-label">جميع التذاكر</div>
          </div>
          <div className="epic-support-summary-number">{totalCount}</div>
        </div>

        <div className="epic-support-tabs">
          <button
            type="button"
            className={`epic-support-tab ${activeTab === "active" ? "active" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            التذاكر النشطة
          </button>

          <button
            type="button"
            className={`epic-support-tab ${activeTab === "resolved" ? "active" : ""}`}
            onClick={() => setActiveTab("resolved")}
          >
            تم الحل
          </button>

          <button
            type="button"
            className={`epic-support-tab ${activeTab === "processing" ? "active" : ""}`}
            onClick={() => setActiveTab("processing")}
          >
            قيد المعالجة
          </button>

          <button
            type="button"
            className={`epic-support-tab ${activeTab === "new" ? "active" : ""}`}
            onClick={() => setActiveTab("new")}
          >
            جديد
          </button>
        </div>

        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => {
            const statusUI = getStatusUI(ticket.status);

            return (
              <button
                type="button"
                className="epic-ticket-card epic-ticket-clickable"
                key={ticket.id}
                onClick={() => setSelectedTicket(ticket)}
              >
                <div className="epic-ticket-card-top">
                  <div className="epic-ticket-id">
                    <Ticket size={16} />
                    {`التذكرة #${ticket.ticketNumber}`}
                  </div>

                  <div className={`epic-ticket-status ${statusUI.className}`}>
                    {statusUI.icon}
                    {statusUI.label}
                  </div>
                </div>

                <div className="epic-ticket-type">
                  نوع المشكلة: {ticket.issueType}
                </div>

                <div className="epic-ticket-desc">{ticket.description}</div>

                <div className="epic-ticket-footer">
                  <span>{ticket.userName}</span>
                  <span>{ticket.date}</span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="epic-ticket-card">
            <div className="epic-ticket-type">لا توجد تذاكر في هذا القسم حاليًا</div>
            <div className="epic-ticket-desc">
              عند توفر تذاكر جديدة ضمن هذا التصنيف ستظهر هنا مباشرة.
            </div>
          </div>
        )}

        {selectedTicket && (
          <>
            <div
              className="epic-modal-overlay"
              onClick={() => setSelectedTicket(null)}
            />

            <div className="epic-ticket-modal" dir="rtl">
              <div className="epic-ticket-modal-top">
                <div className="epic-ticket-modal-title-wrap">
                  <div className="epic-ticket-modal-title">تفاصيل التذكرة</div>
                  <div className="epic-ticket-modal-id">
                    #{selectedTicket.ticketNumber}
                  </div>
                </div>

                <button
                  type="button"
                  className="epic-ticket-modal-close"
                  onClick={() => setSelectedTicket(null)}
                >
                  <X size={18} />
                </button>
              </div>

              <div className="epic-ticket-modal-section">
                <div className="epic-ticket-modal-label">نوع المشكلة</div>
                <div className="epic-ticket-modal-value">
                  {selectedTicket.issueType}
                </div>
              </div>

              <div className="epic-ticket-modal-section">
                <div className="epic-ticket-modal-label">الوصف</div>
                <div className="epic-ticket-modal-value epic-ticket-modal-description">
                  {selectedTicket.description}
                </div>
              </div>

              <div className="epic-ticket-modal-grid">
                <div className="epic-ticket-modal-section">
                  <div className="epic-ticket-modal-label">اسم المستخدم</div>
                  <div className="epic-ticket-modal-value">
                    {selectedTicket.userName}
                  </div>
                </div>

                <div className="epic-ticket-modal-section">
                  <div className="epic-ticket-modal-label">التاريخ</div>
                  <div className="epic-ticket-modal-value">
                    {selectedTicket.date}
                  </div>
                </div>
              </div>

              {selectedTicket.email ? (
                <div className="epic-ticket-modal-section">
                  <div className="epic-ticket-modal-label">البريد الإلكتروني</div>
                  <div className="epic-ticket-modal-value">
                    {selectedTicket.email}
                  </div>
                </div>
              ) : null}

              <div className="epic-ticket-modal-section">
                <div className="epic-ticket-modal-label">الحالة الحالية</div>
                <div className="epic-ticket-modal-status-row">
                  {(() => {
                    const statusUI = getStatusUI(selectedTicket.status);
                    return (
                      <div className={`epic-ticket-status ${statusUI.className}`}>
                        {statusUI.icon}
                        {statusUI.label}
                      </div>
                    );
                  })()}
                </div>
              </div>

              <div className="epic-ticket-modal-actions">
                <button
                  type="button"
                  className="epic-ticket-action-btn success"
                  onClick={() => updateTicketStatus(selectedTicket.id, "resolved")}
                >
                  تم الحل
                </button>

                <button
                  type="button"
                  className="epic-ticket-action-btn danger"
                  onClick={() => updateTicketStatus(selectedTicket.id, "processing")}
                >
                  قيد المعالجة
                </button>

                <button
                  type="button"
                  className="epic-ticket-action-btn warning"
                  onClick={() => updateTicketStatus(selectedTicket.id, "active")}
                >
                  نشطة
                </button>

                <button
                  type="button"
                  className="epic-ticket-action-btn primary"
                  onClick={() => updateTicketStatus(selectedTicket.id, "new")}
                >
                  جديد
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </MobileChrome>
  );
}