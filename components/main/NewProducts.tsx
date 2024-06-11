import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { truncateText } from "@/lib/components/TruncateText";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, Autoplay, Pagination } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import { Performance_TYPE, Exhibition_TYPE, PopupStore_TYPE } from "@/pages";

interface NewProducts_TYPE {
  selectedNew: string;
  data: (Performance_TYPE | Exhibition_TYPE | PopupStore_TYPE)[];
}

const linkUrl = (selectedNew: string) => {
  switch (selectedNew) {
    case "New공연":
      return "/performances";
    case "New전시":
      return "/exhibitions";
    case "New팝업스토어":
      return "/popupstores";
    default:
      return "/performances"; // 기본값 설정 (필요 시 조정)
  }
};

const NewProducts: React.FC<NewProducts_TYPE> = ({ selectedNew, data }) => {
  const word = selectedNew.match(/[가-힣]+/g)?.[0];
  SwiperCore.use([Navigation, Pagination, Autoplay, Scrollbar]);

  return (
    <div className="flex justify-center items-center">
      <div className="sm:w-4/5">
        <Swiper
          className="slider-wrapper flex "
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }}
          pagination={{ clickable: false }}
          autoplay={{ delay: 2000 }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 40
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 50
            },
            1400: {
              slidesPerView: 4,
              spaceBetween: 50
            }
          }}
        >
          {data.map((el) => {
            const id = el.id || el._id;
            return (
              <SwiperSlide key={el.id}>
                <Link href={`${linkUrl(selectedNew)}/${id}`} key={id}>
                  <div className="card w-80 border-b-2 shadow-lg ">
                    <figure className="bg-black h-96 md:h-80">
                      {el.posterurl ? (
                        <Image
                          src={el.posterurl}
                          alt="new image"
                          width={300}
                          height={200}
                          className="rounded-4xl w-full "
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <p>Image not available</p>
                        </div>
                      )}
                    </figure>
                    <div className="card-body text-black rounded-3xl pb-2">
                      <h2 className="card-title text-2xl sm:text-xl">
                        {truncateText(el.name, 9)}
                        <div className="badge badge-secondary bg-main-yellow border-none text-black ">
                          NEW
                        </div>
                      </h2>
                      <p className="text-lg sm:text-base ">
                        장소 : {truncateText(el.place, 13)}
                      </p>
                      <p className="text-lg sm:text-base ">
                        마감 : {el.enddate}
                      </p>
                      <div className="card-actions flex flex-col m-5 items-end ">
                        <div className="badge badge-outline my-1">
                          {el.genre}
                        </div>
                        <div className="badge badge-outline">{el.status}</div>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
          <div className="flex justify-end mt-12 mr-6">
            <Link href={`${linkUrl(selectedNew)}`}>
              <div className="text-black font-bold text-xl hover:text-main-pink">
                {`더 많은 ${word} 보러 가기`}
              </div>
            </Link>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default NewProducts;
