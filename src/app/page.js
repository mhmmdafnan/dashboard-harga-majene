import { Suspense } from "react";
import MainApp from "./dashboard.js";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainApp />
    </Suspense>
  );
}
