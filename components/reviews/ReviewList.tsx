import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { updateReview } from "@/lib/api/reviews";
import DeleteReviewButton from "./DeleteReviewButton";
import { ReviewData, DetailReview_TYPE } from "@/pages/performances/[id]";
import axios from "axios";

import { UserDetailType } from "./CreateReviewForm";
import { getMemberDetails } from "@/lib/api/mypage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface ReviewList_TYPE {
  id: string;
  props: DetailReview_TYPE;
}

const fetchReviews = async (performId: string, pageNo: number) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/reviewList/${performId}?page=${pageNo}&size=3`
  );
  return res.data;
};

export default function ReviewList({ id, props }: ReviewList_TYPE) {
  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);
  const [pageNo, setPageNo] = useState(1);
  const queryClient = useQueryClient();
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["reviews", id, pageNo], () => fetchReviews(id, pageNo), {
      keepPreviousData: true
    });
  const [userDetail, setUserDetail] = useState<UserDetailType>({
    loginid: "_",
    name: "_",
    email: "_",
    nickname: "_",
    msg: null
  });

  const reviews = data?.datalist || [];

  const [editingReview, setEditingReview] = useState<ReviewData | null>(null);
  const [reviewContents, setReviewContents] = useState<{
    [key: number]: string;
  }>({});
  const [reviewRatings, setReviewRatings] = useState<{ [key: number]: number }>(
    {}
  );

  useEffect(() => {
    if (isLoggedIn) {
      const memberDataUpdate = async () => {
        try {
          let userDetail = await getMemberDetails();
          setUserDetail(userDetail);
        } catch (error) {
          console.error("Failed to fetch member details:", error);
        }
      };
      memberDataUpdate();
    }
  }, [isLoggedIn]);
  useEffect(() => {
    if (pageNo < props.totalPages) {
      queryClient.prefetchQuery(["reviews", id, pageNo + 1], () =>
        fetchReviews(id, pageNo + 1)
      );
    }
  }, [id, pageNo, queryClient, props.totalPages]);

  const { mutate: updateMutate } = useMutation(
    (updatedReview: { id: number; review: Partial<ReviewData> }) =>
      updateReview(updatedReview.id, updatedReview.review),
    {
      onMutate: async (updatedReview) => {
        await queryClient.cancelQueries(["reviews", id]);

        const previousReviews = queryClient.getQueryData(["reviews", id]);

        queryClient.setQueryData(["reviws", id], updatedReview);

        return { previousReviews };
      },
      onError: (err, updatedReview, context) => {
        if (context?.previousReviews) {
          queryClient.setQueryData(["reviews", id], context.previousReviews);
        } else {
          console.error("Error: Missing context with previous review data");
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["reviews", id]);
        setEditingReview(null);
      }
    }
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-96">
        <div className="loading loading-dots loading-lg"></div>
      </div>
    );

  const submitUpdate = (reviewId: number) => {
    const updatedReview = {
      reviewid: reviewId,
      content: reviewContents[reviewId],
      rate: reviewRatings[reviewId],
      updid: "",
      upddt: new Date().toISOString()
    };

    updateMutate({ id: reviewId, review: updatedReview });
  };

  const handleEditClick = (review: ReviewData) => {
    setEditingReview(review);
    setReviewContents((prev) => ({
      ...prev,
      [review.reviewid]: review.content
    }));
    setReviewRatings((prev) => ({
      ...prev,
      [review.reviewid]: review.rate
    }));
  };

  const handleInputChange = (reviewId: number, newContent: string) => {
    setReviewContents((prev) => ({
      ...prev,
      [reviewId]: newContent
    }));
  };

  const handleRatingChange = (reviewId: number, newRating: number) => {
    setReviewRatings((prev) => ({
      ...prev,
      [reviewId]: newRating
    }));
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    const errorMessage = (error as Error).message;
    return <div>{errorMessage}</div>;
  }
  return (
    <div className="flex-col w-full">
      <div className="flex justify-center w-full ">
        <div className="w-full ">
          {reviews &&
            reviews.map((el: any) => {
              const isEditing =
                editingReview && editingReview.reviewid === el.reviewid;
              const isAuthor = userDetail.loginid == el.memberid;
              return (
                <div
                  key={el.reviewid}
                  className="w-full bg-white shadow-2xl rounded-xl border-2 border-white mb-4 p-6"
                >
                  <div className="py-2 flex justify-between items-center">
                    <div className="text-xl font-semibold">{el.nickname}</div>
                    <div className="text-gray-500 flex justify-end group-hover:text-white">
                      {new Date(el.regdt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="rating py-2">
                    {[1, 2, 3, 4, 5].map((star, idx) => (
                      <input
                        key={idx}
                        type="radio"
                        name={`rating-${el.reviewid}`}
                        value={star}
                        checked={
                          isEditing
                            ? star === reviewRatings[el.reviewid]
                            : star === el.rate
                        }
                        onChange={() => handleRatingChange(el.reviewid, star)}
                        className="mask mask-star-2 bg-orange-400"
                      />
                    ))}
                  </div>

                  <div className="pt-2 flex justify-between">
                    {isEditing ? (
                      <input
                        type="text"
                        value={reviewContents[el.reviewid] || ""}
                        onChange={(e) =>
                          handleInputChange(el.reviewid, e.target.value)
                        }
                        className="border p-1 w-full"
                      />
                    ) : (
                      <div>리뷰: {el.content}</div>
                    )}
                  </div>
                  {isAuthor && (
                    <div className="flex gap-x-1 justify-end">
                      {isEditing ? (
                        <button
                          onClick={() => submitUpdate(el.reviewid)}
                          className="bg-white text-black p-2 rounded  border-2 boder-black font-semibold"
                        >
                          수정 완료
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(el)}
                          className="bg-white text-black p-2 rounded border-2 boder-black font-semibold"
                        >
                          수정
                        </button>
                      )}
                      <DeleteReviewButton id={el.reviewid} />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      <div className="flex justify-around w-full py-10">
        <button
          onClick={() => setPageNo((old) => Math.max(old - 1, 1))}
          className={pageNo === 1 ? "text-white" : "text-gray-600"}
          disabled={pageNo === 1}
        >
          <FaArrowAltCircleLeft className=" bg-white w-9 h-6" />
        </button>
        <span className="text-black font-semibold">Page {pageNo}</span>
        <button
          onClick={() => {
            if (!isPreviousData && data.hasNext) {
              setPageNo((old) => old + 1);
            }
          }}
          className={data.hasNext ? "text-gray-600" : "text-white"}
          disabled={isPreviousData || !data?.hasNext}
        >
          <FaArrowAltCircleRight className=" bg-white w-9 h-6" />
        </button>
        {isFetching ? <span>Loading...</span> : null}
      </div>
    </div>
  );
}
