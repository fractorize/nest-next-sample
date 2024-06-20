import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex items-center justify-center">
      <span className="loading loading-dots loading-lg"></span>
    </div>
  );
}
