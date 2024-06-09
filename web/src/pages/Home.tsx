import { useEffect, useState } from "react";
import { MdElectricBolt } from "react-icons/md";
import useWebSocket from "../hooks/useWebSocket";

const Home = () => {
  const { message, isConnected } = useWebSocket("ws://localhost:8080/ws");
  const [data, setData] = useState<{ [key: string]: { voltage: number; current: number; active_power: number } } | null>(null);

  useEffect(() => {
    if (isConnected && message) {
      const parsedData = JSON.parse(message);
      setData(parsedData);
    }
  }, [message, isConnected]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Electricity Tracker</h2>
      <p className="text-center text-gray-400">
        Track your electricity usage in real-time
      </p>

      { !data && (
        <>
          <div className="flex flex-col mx-auto gap-4 pt-10 animate-pulse opacity-30">
            <div className="flex justify-center">
              <span className="bg-base-100 w-28 h-8 rounded-xl" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 m-4 ">
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
            </div>
          </div>

          <div className="flex flex-col mx-auto gap-4 pt-10 animate-pulse opacity-15">
            <div className="flex justify-center">
              <span className="bg-base-100 w-28 h-8 rounded-xl" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 m-4">
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
            </div>
          </div>

          <div className="flex flex-col mx-auto gap-4 pt-10 animate-pulse opacity-5">
            <div className="flex justify-center">
              <span className="bg-base-100 w-28 h-8 rounded-xl" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 m-4">
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
              <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined"></div>
            </div>
          </div>
        </>
      )}

      {Object.keys(data || {}).map((key) => (
        <div key={key} className="flex flex-col mx-auto gap-4 pt-10">
          <h4 className="text-xl font-bold text-center">{key}</h4>
          <div className="flex flex-wrap justify-center gap-4 m-4">
            <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
              <div className="stat">
                <div className="stat-figure text-yellow-500">
                  <MdElectricBolt className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-300">Volt</div>
                <div className="stat-value text-yellow-500">
                  {data && data[key]["voltage"].toFixed(1)} V
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
            <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
              <div className="stat">
                <div className="stat-figure text-yellow-500">
                  <MdElectricBolt className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-300">Amp</div>
                <div className="stat-value text-yellow-500">
                  {data && data[key]["current"].toFixed(3)} A
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
            <div className="preview border-base-300 bg-base-100 rounded-box flex min-h-[6rem] min-w-[18rem] max-w-4xl flex-wrap items-center justify-center gap-2 overflow-x-hidden bg-cover bg-top p-4 [border-width:var(--tab-border)] undefined">
              <div className="stat">
                <div className="stat-figure text-yellow-500">
                  <MdElectricBolt className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-300">Watt</div>
                <div className="stat-value text-yellow-500">
                  {data && data[key]["active_power"].toFixed(1)} W
                </div>
                {/* <div className="stat-desc">21% more than last month</div> */}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
