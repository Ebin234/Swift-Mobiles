export default function AboutPage() {
  return (
    <div>
      <main className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto bg-[#edf4f4] p-4 ">
          <h1 className="text-3xl font-bold mb-6 text-black">
            Unboxed & Non-Refurbished Product Categories
          </h1>

          <p className="text-gray-700 mb-4">
            This category applies to non-refurbished devices only. All products
            listed here are not refurbished and are graded purely based on
            cosmetic condition, while remaining fully functional.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-3 text-black">
            Cosmetic Grade Classification (Unboxed/ A / B / C / D)
          </h2>
          <p className="text-gray-700 mb-4">
            These grades apply only to non-refurbished devices and are based on
            cosmetic condition.
          </p>

          <h2 className="text-[18px] font-semibold mt-8 mb-3 text-black">
            Unboxed Category (As Good As New)
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Not used – box opened only</li>
            <li>Fresh devices with zero usage</li>
            <li>No scratches, dents, or cosmetic damage</li>
            <li>100% functional condition</li>
            <li>May be opened for inspection, demo, or inventory check</li>
            <li>Ideal alternative to brand-new products at better value</li>
          </ul>

          <h2 className="text-[18px] font-semibold mt-8 mb-3 text-black">
            A Category – Excellent Condition
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>No noticeable scratches or dents</li>
            <li>Clean body and screen</li>
            <li>Looks almost like a brand-new device</li>
            <li>Fully functional</li>
          </ul>

          <h2 className="text-[18px] font-semibold mt-8 mb-3 text-black">
            B Category – Very Good Condition
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Minor noticeable scratches or small dents</li>
            <li>Light signs of handling or storage</li>
            <li>No impact on performance</li>
            <li>Fully functional</li>
          </ul>

          <h2 className="text-[18px] font-semibold mt-8 mb-3 text-black">
            C Category – Good Condition
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Visible scratches or dents</li>
            <li>Clear cosmetic wear</li>
            <li>No functional issues</li>
            <li>Fully functional despite cosmetic marks</li>
          </ul>

          <h2 className="text-[18px] font-semibold mt-8 mb-3 text-black">
            D Category – Acceptable Condition
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Major scratches or dents</li>
            <li>Heavy cosmetic wear</li>
            <li>May look used or rough</li>
            <li>Functionally 100% OK</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-3 text-black">
            Important Notes
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>These categories do NOT include refurbished devices</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
