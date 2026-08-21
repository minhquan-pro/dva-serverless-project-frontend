import { useState, type FormEvent } from "react";
import { Modal } from "./Modal";
import { useAuth } from "../context/AuthContext";
import { submitReservationRequest } from "../services/reservationService";

type Status = "idle" | "loading" | "success" | "error";

const TIME_SLOTS = ["6:00", "6:30", "7:00", "7:30", "8:00", "8:30", "9:00", "9:30", "10:00"];

const FIELD_CLASS =
  "w-full resize-none border-0 border-b-[1.5px] border-grid bg-transparent px-0 py-2 text-sm font-medium text-ink outline-none focus:border-red";

interface ReservationModalProps {
  open: boolean;
  onClose: () => void;
}

export function ReservationModal({ open, onClose }: ReservationModalProps) {
  const { user } = useAuth();
  const [date, setDate] = useState("");
  const [time, setTime] = useState(TIME_SLOTS[1]);
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [confirmationId, setConfirmationId] = useState("");

  function handleClose() {
    setStatus("idle");
    setConfirmationId("");
    onClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!date || !name.trim() || !phone.trim()) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const result = await submitReservationRequest({
        date,
        time,
        partySize,
        name: name.trim(),
        phone: phone.trim(),
        note: note.trim() || undefined,
      });
      setConfirmationId(result.confirmationId);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Modal open={open} onClose={handleClose} title="Phiếu đặt bàn">
      {status === "success" ? (
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <span className="border-[1.5px] border-red px-3.5 py-1 font-display text-xs font-extrabold uppercase tracking-wide text-red">
            Giữ bàn thành công
          </span>
          <p className="font-medium text-ink/70">
            Mã phiếu <span className="font-extrabold text-ink">{confirmationId}</span> — quán sẽ gọi xác nhận qua{" "}
            {phone}.
          </p>
          <button
            type="button"
            onClick={handleClose}
            className="mt-2 font-display text-xs font-extrabold uppercase tracking-wide text-ink/60 hover:text-red"
          >
            Đóng
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="res-date" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/55">
                Ngày
              </label>
              <input
                id="res-date"
                type="date"
                required
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={FIELD_CLASS}
              />
            </div>
            <div>
              <label htmlFor="res-size" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/55">
                Số người
              </label>
              <input
                id="res-size"
                type="number"
                min={1}
                required
                value={partySize}
                onChange={(event) => setPartySize(Math.max(1, Number(event.target.value)))}
                className={FIELD_CLASS}
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/55">Khung giờ</span>
            <div className="flex flex-wrap gap-2">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setTime(slot)}
                  aria-pressed={slot === time}
                  className={`border-[1.5px] border-ink px-3.5 py-2 text-sm font-extrabold tabular-nums transition-colors ${
                    slot === time ? "bg-ink text-paper" : "bg-paper text-ink hover:bg-paper-deep"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="res-name" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/55">
              Họ tên
            </label>
            <input
              id="res-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={FIELD_CLASS}
            />
          </div>

          <div>
            <label htmlFor="res-phone" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/55">
              Số điện thoại
            </label>
            <input
              id="res-phone"
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={FIELD_CLASS}
            />
          </div>

          <div>
            <label htmlFor="res-note" className="mb-2 block text-xs font-bold uppercase tracking-wide text-ink/55">
              Ghi chú (không bắt buộc)
            </label>
            <textarea
              id="res-note"
              rows={2}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Vd: bàn gần cửa sổ"
              className={FIELD_CLASS}
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full border-[1.5px] border-ink bg-ink py-3.5 font-display text-sm font-extrabold uppercase tracking-wide text-paper transition-colors hover:border-red hover:bg-red disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Đang giữ bàn..." : "Giữ bàn"}
          </button>
          {status === "error" && (
            <p className="text-sm font-bold text-red">
              {date && name.trim() && phone.trim()
                ? "Giữ bàn thất bại, vui lòng thử lại."
                : "Vui lòng điền đầy đủ ngày, họ tên và số điện thoại."}
            </p>
          )}
        </form>
      )}
    </Modal>
  );
}
