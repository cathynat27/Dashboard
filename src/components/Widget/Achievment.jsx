import React, { useEffect, useState } from "react";

function Achievement() {
  const [totalPatients, setTotalPatients] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://mk-be-strapi-production.up.railway.app/api/all-patients`
      );
      const data = await response.json();
      const allPatients = data.map((user) => user.patients).flat();

      setTotalPatients(allPatients.length);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div className="widgetCard relative hidden md:flex col-span-2 px-6 py-4 text-center flex-col justify-between bg-cyan-700 text-slate-50">
      <div className="font-semibold text-slate-800 bg-white max-w-fit mx-auto pt-5 pb-2 px-6 absolute -top-3 rounded-lg left-1/2 -translate-x-1/2 whitespace-nowrap">
        Total Beneficiaries
      </div>

      <div className="font-semibold m-auto pt-4">
        <span className="text-lg lg:text-[80px]">{totalPatients}</span>
        <span className="text-[14px]">patients</span>
      </div>
      {/* <p className="text-sm font-semibold">Pati</p> */}
    </div>
  );
}

export default Achievement;
