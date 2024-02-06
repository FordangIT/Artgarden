import Image from "next/image";
import { useState, useEffect } from "react";
const BestProducts = () => {
  const [data, setData] = useState<Array<any>>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/performances/best");
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("error fetching datat", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {data &&
          data.map((el) => (
            <div
              key={el.id}
              className="card w-[26rem] h-[30rem] bg-white shadow-xl rounded-none border-2 border-white"
            >
              <figure>
                <Image src={el.img} alt="공연사진" width={420} height={450} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {el.name}
                  <div className="badge bg-main-pink text-white">BEST</div>
                </h2>
                공연기간: {el.date} <p>지역: {el.place}</p>
                <div className="card-actions justify-end">
                  <div className="badge badge-outline">{el.genre}</div>
                  <div className="badge badge-outline">
                    공연횟수: {el.count}번
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div>더 보기</div>
    </>
  );
};
export default BestProducts;
