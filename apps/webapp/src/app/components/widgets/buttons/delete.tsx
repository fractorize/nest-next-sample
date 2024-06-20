"use client";
import { useRef } from "react";

export default function Delete({
  deleteFn,
  suffix,
  className,
  confirmationMessage,
}: {
  deleteFn: () => void;
  suffix?: string;
  className?: string;
  confirmationMessage?: string;
}) {
  const modalRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        className={`btn btn-sm ${className}`}
        onClick={() => modalRef?.current?.showModal()}
      >
        Delete {suffix ? suffix : ""}
      </button>
      <dialog id="my_modal_3" className="modal" ref={modalRef}>
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className={`btn btn-sm btn-circle btn-ghost absolute right-2 top-2`}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg text-error">
            Delete {suffix ? `${suffix}!` : "!"}
          </h3>
          {confirmationMessage ? (
            <p className="py-4">{confirmationMessage}</p>
          ) : null}
          <button className="btn btn-sm btn-error" onClick={deleteFn}>
            Confirm
          </button>
        </div>
      </dialog>
    </>
  );
}
