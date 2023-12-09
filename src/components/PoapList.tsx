import React from 'react';

const PoapList = ({ poapList }: any) => {
  const formattedDate = (date: any) => {
    const parsedDate = new Date(date);
    const formattedDate = parsedDate.toLocaleDateString();
    return formattedDate;
  };
  return (
    <div className="carousel carousel-center max-w-md p-4 space-x-4 rounded-box pb-24">
      {poapList?.map((poap: any, index: number) => (
        <div key={index} className="relative carousel-item">
          <img
            src={
              poap?.poapEvent?.logo?.image?.medium ||
              'https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg'
            }
            className="rounded-box w-56 h-56"
          />
          <p className="text-start absolute -bottom-12 left-5 text-xs">
            <span className="capitalize font-bold">
              {poap?.poapEvent?.eventName}
            </span>
          </p>
          <p className="text-start absolute -bottom-16 left-5 text-xs font-bold">
            StartDate:
            <span className="capitalize font-bold ml-3">
              {formattedDate(poap?.poapEvent?.startDate)}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default PoapList;
