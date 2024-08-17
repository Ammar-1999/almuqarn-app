import { BarChart } from "@tremor/react";
import { useCommission, useStore } from "@/lib/store";
import { useShallow } from "zustand/react/shallow";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
const QUALITY = {
  لحظي: [0, 0.5, 0.15, 0.25],
  يومي: [0.25, 0.3, 0.45, 0.55],
  اسبوعي: [0.55, 0.6, 0.75, 0.85],
  شهري: [0.85, 0.9, 1.05, 1.15],
};
const dataFormatter = (number: number) =>
  `${number.toLocaleString("en-US")}`;
const dataFormatter2 = (number: number) => {
  if (number == 0 || number == 1) return "سيء جدا";
  else if (number == 25) return "سيء";
  else if (number == 50) return "جيد";
  else if (number == 75) return "جيد جدا";
  else if (number == 100) return "ممتاز";
  return "";
};

export default function Charts({ setTotalGoals, setCommissionOut }) {
  const [totalCommission, commissions] = useCommission((state) => [
    state.totalCommission,
    state.commissions, 
  ]);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });
  const { ref: refQuality, inView: inViewQuality } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });
  const { data, tips, setTips } = useStore(useShallow((state) => ({
    data: state.data,
    tips: state.tips,
    setTips: state.setTips,
  })));
  const [maxNumber, setMaxNumber] = useState("");
  const [chartData, setChartData] = useState([]);
  const [chartDataAnim, setChartDataAnim] = useState([]);
  const [chartDataQualityAnim, setChartDataQualityAnim] = useState([]);
  const [chartDataQuality, setChartDataQuality] = useState([]);

  useEffect(() => {
    setChartData(() => {
      let newObject: any = [];
      let anim: any = [];
      let totalGoals = {};
      let commission = {};
      let max = 9999;
      for (let i = 0; i < data.length; i++) {
        let allStocks = +data[i].count;
        for (let j = 0; j < data[i].goals.length; j++) {
          if (!data[i].goals[j].price) continue;
          if (!newObject[j]?.name) {
            anim[j] = { name: `الهدف ${j + 1}` };
            newObject[j] = { name: `الهدف ${j + 1}` };
          }
          let calcCommission = 0;
          if (data[i].goals.length === 1) {
            if (commissions.on) {
              calcCommission =
                +((+totalCommission / 100) *
                +data[i].goals[j].price *
                allStocks).toFixed(3);
              commission[data[i].name] =
                (commission[data[i].name] || 0) + calcCommission;
            }

            let newVal = +(
              (+data[i].goals[j].price -
                (+data[i].price +
                  +data[i].price * ((commissions.on ? +totalCommission : 0) / 100))) *
                allStocks -
              calcCommission
            ).toFixed(3);
            newObject[j][data[i].name] = newVal;
            anim[j][data[i].name] = 0;
            max = Math.abs(newVal) > max ? +parseInt(Math.abs(newVal).toString()) : max;
            totalGoals[data[i].name] = newVal;
          } else {
            if (commissions.on) {
              calcCommission =
                (+totalCommission / 100) *
                +data[i].goals[j].price *
                +data[i].goals[j].sold;
              commission[data[i].name] =
                +((commission[data[i].name] || 0) + calcCommission).toFixed(3);
            }
            let newVal = +(
              (+data[i].goals[j].price -
                (+data[i].price +
                  +data[i].price * ((commissions.on ? +totalCommission : 0) / 100))) *
                +data[i].goals[j].sold -
              calcCommission
            ).toFixed(3);
            allStocks -= +data[i].goals[j].sold;
            newObject[j][data[i].name] = newVal;
            anim[j][data[i].name] = 0;
            max = Math.abs(newVal) > max ? +parseInt(Math.abs(newVal).toString()) : max;

            totalGoals[data[i].name] = (totalGoals[data[i].name] || 0) + newVal;
          }
        }
      }
      setCommissionOut(commission);
      setMaxNumber(max.toString());
      setChartDataAnim(anim);
      setTotalGoals(totalGoals);
      return newObject;
    });
  }, [data]);
  useEffect(() => {
    setChartDataQuality(() => {
      let anim: any = [];
      let newObject: any = [];
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].goals.length; j++) {
          let qualityGoals = QUALITY[data[i].goals[j].time];
          if (
            !data[i].goals[j].time ||
            !qualityGoals ||
            !data[i].goals[j].price
          )
            continue;
          if (!newObject[j]?.name) {
            anim[j] = { name: `الهدف ${j + 1}` };
            newObject[j] = { name: `الهدف ${j + 1}` };
          }
          let qualityPrice: number | string =
            +data[i].goals[j].price - +data[i].price;
          if (qualityGoals[0] > qualityPrice) qualityPrice = "1";
          else if (qualityGoals[1] > qualityPrice) qualityPrice = "25";
          else if (qualityGoals[2] > qualityPrice) qualityPrice = "50";
          else if (qualityGoals[3] > qualityPrice) qualityPrice = "75";
          else if (qualityGoals[3] <= qualityPrice) qualityPrice = "100";
          else continue;

          anim[j][data[i].name] = 0;
          newObject[j][data[i].name] = qualityPrice;
        }
      }
      setChartDataQualityAnim(anim);
      return newObject;
    });
  }, [data]);
  if (!data || !tips || !chartData.length) return null;
  return (
    <>
      <div className="relative mt-7">
        <h3 className="text-2xl font-semibold text-tremor-content-strong">
          ربح الاهداف
        </h3>
        {tips.handClickChart && (
          <div className="absolute z-20 pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <div className="rim1"></div>
              <div className="rim2"></div>
            </div>
            <svg
              className="hand_click drop-shadow-md"
              width="35"
              height="35"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.1666 0.503702C25.3407 0.566474 24.5742 0.801044 23.7812 1.24045C22.0039 2.22168 20.5899 4.03215 19.9126 6.19943C19.7209 6.80733 19.7077 6.86019 19.6086 7.38879C19.298 9.09355 19.3245 10.3952 19.7573 14.3069C19.8894 15.5128 20.0811 17.5644 20.1603 18.6183C20.2198 19.4046 20.2198 22.5004 20.1603 23.1281C20.048 24.3208 19.8894 25.3449 19.6714 26.2501C19.5359 26.8217 19.2815 27.6543 19.2287 27.7138C19.2188 27.7269 19.0337 27.6046 18.8223 27.4395C16.7971 25.8768 14.7223 24.7734 13.001 24.3504C12.1784 24.1489 11.957 24.1226 11.1014 24.1226C10.3877 24.1226 10.2919 24.1291 9.90868 24.2116C8.45502 24.519 7.2987 25.226 6.19854 26.4781C5.66993 27.0794 4.99595 28.087 4.61271 28.847C4.3418 29.3822 4.20635 29.9537 4.23939 30.4426C4.32528 31.7576 5.51465 32.9436 7.69845 33.8918C9.11909 34.5063 10.9263 35.0051 12.8788 35.3224C13.5131 35.4247 13.6552 35.4677 13.9889 35.6626C14.6628 36.059 15.426 36.7859 17.2233 38.7483C18.4754 40.1128 19.3807 41.0478 20.0051 41.6128L20.4444 42.0125L20.352 42.2173C20.1471 42.6766 20.0348 43.2944 20.0711 43.7768C20.1471 44.7546 20.6262 45.7327 21.4555 46.5916C22.4597 47.6388 23.5104 48.1971 25.3044 48.6465C25.9519 48.8084 26.9066 48.9901 27.6698 49.0958C28.7899 49.2478 30.4021 49.3239 31.5254 49.2776C33.5307 49.1916 34.7961 48.9141 35.8633 48.3294C38.1428 47.0739 39.0283 45.5343 38.4335 43.8427C38.3708 43.6612 38.3146 43.4893 38.3146 43.4595C38.3114 43.4299 38.4006 43.3307 38.5228 43.2317C39.3521 42.5675 40.4257 41.5203 41.0799 40.7372C42.811 38.6625 43.9939 36.4191 44.8298 33.6341C45.3154 32.0053 45.7019 29.9437 45.8275 28.2952C45.8837 27.5519 45.8506 26.0981 45.7646 25.5398C45.4806 23.7195 44.9024 22.0774 44.1161 20.8683C42.9565 19.0809 41.4268 18.1558 39.0944 17.8222L38.8202 17.7857L38.6252 17.3828C37.525 15.123 35.143 13.5834 32.2786 13.2795C31.8755 13.2365 31.598 13.2299 30.9736 13.2464C30.5376 13.2596 30.1278 13.2728 30.0651 13.2762L29.9495 13.2828V12.4899C29.9527 9.76093 29.9858 8.91845 30.2171 5.89879C30.2633 5.29089 30.3096 4.59049 30.3195 4.34601C30.3658 3.16985 30.0254 2.2448 29.2821 1.53778C28.9848 1.25366 28.7899 1.1149 28.4298 0.936499C27.9342 0.688714 27.5443 0.582994 26.8935 0.513614C26.5863 0.48388 26.4672 0.480575 26.1666 0.503702ZM27.4783 1.9012C28.4066 2.13907 28.9351 2.92537 28.9418 4.06519C28.9418 4.22707 28.8988 4.89114 28.8426 5.53537C28.6049 8.40637 28.5619 9.50984 28.5619 12.7872C28.5619 15.5624 28.5718 15.8828 28.6974 16.9665C28.9021 18.7605 29.4308 20.3926 30.2469 21.7735C30.4913 22.1864 30.9571 22.8571 30.9803 22.834C30.9902 22.8274 30.9439 22.6524 30.8778 22.4475C30.3954 20.8848 30.075 18.5027 29.9659 15.6483C29.9462 15.1527 29.9363 14.7397 29.9428 14.7331C30.0485 14.6274 32.1597 14.5977 32.7247 14.6968C34.241 14.9644 35.4635 15.569 36.3456 16.4941C36.9436 17.1217 37.2773 17.6835 37.6143 18.6349C38.1296 20.0885 38.2982 20.5346 38.5889 21.2284C38.8102 21.7504 39.0151 22.1667 39.2529 22.573C39.4545 22.9133 39.7716 23.3659 39.8806 23.4584L39.9534 23.5245L39.9303 23.4584C39.8575 23.2734 39.7022 22.5862 39.5834 21.9222C39.3521 20.6304 39.1407 19.3121 39.1638 19.289C39.2034 19.2494 39.8211 19.3815 40.2408 19.5203C42.4576 20.2471 43.7593 22.1633 44.3374 25.553C44.6084 27.1388 44.4267 29.3722 43.8221 31.9426C42.7879 36.3398 40.8454 39.5445 37.6606 42.1149C36.8478 42.7724 36.4876 42.997 35.9029 43.2118C34.6342 43.6843 32.9461 43.889 30.6597 43.8494C28.5685 43.8131 26.6788 43.5818 25.1161 43.1655C23.9928 42.8649 22.8892 42.2173 21.5578 41.0809C21.0524 40.6447 19.3807 38.9796 18.4688 37.995C18.0823 37.5755 17.4215 36.8884 17.0019 36.4654C15.9843 35.438 15.4392 34.9589 14.8346 34.5657C14.2697 34.2024 13.8831 34.0471 13.3149 33.9644C12.8292 33.8918 11.8678 33.7266 11.6035 33.6638C10.3514 33.3797 9.67743 33.1914 8.85477 32.9007C7.62907 32.4646 6.69411 31.9393 6.19523 31.3975C5.94083 31.1232 5.8285 30.9382 5.74261 30.6639C5.65671 30.3831 5.67323 29.9603 5.77565 29.6993C5.97718 29.1937 6.73044 28.0144 7.2095 27.4559C8.13126 26.3789 9.11578 25.7579 10.2721 25.5266C12.413 25.0937 15.089 26.2105 18.449 28.9395C19.2155 29.5638 19.2617 29.5968 19.4732 29.6134C19.711 29.6331 19.9852 29.5077 20.1042 29.3292C20.2958 29.0353 20.7749 27.6509 21.0094 26.7292C21.1812 26.0419 21.2869 25.4903 21.4093 24.6411C21.5843 23.3989 21.6207 22.7778 21.6207 20.9475C21.6239 18.7043 21.5513 17.6867 21.1119 13.6462C20.8674 11.3765 20.8145 10.6628 20.8112 9.58581C20.8112 8.42949 20.9102 7.64319 21.1746 6.70161C21.6207 5.13562 22.4664 3.85044 23.626 2.97493C24.8518 2.05317 26.3879 1.62368 27.4783 1.9012ZM22.1658 43.3242C23.5335 44.2326 24.6733 44.6226 26.9099 44.9463C29.933 45.3857 33.2202 45.3261 35.4172 44.8009C35.8666 44.6919 36.5241 44.4771 36.8312 44.3351L37.0724 44.226L37.1187 44.3351C37.2145 44.5631 37.2508 44.8735 37.2079 45.118C37.1022 45.726 36.6397 46.2413 35.6881 46.8095C34.3469 47.6092 33.2731 47.8701 31.1223 47.9131C29.0707 47.9559 27.0718 47.7182 25.3407 47.2292C24.4685 46.9813 23.8869 46.7237 23.2858 46.3173C22.1063 45.5211 21.4851 44.6952 21.4224 43.8362C21.3959 43.4695 21.5215 42.898 21.614 42.9574C21.6371 42.9706 21.885 43.1357 22.1658 43.3242Z"
                fill="black"
              />
              <path
                d="M33.1829 31.6717C32.988 31.7179 32.7601 31.9261 32.6973 32.1245C32.651 32.2797 32.6214 32.4614 32.3108 34.774C32.0035 37.0569 31.7359 38.5337 31.323 40.2551C31.1512 40.9621 31.1512 41.0412 31.3461 41.3222C31.5575 41.6328 32.0763 41.6723 32.3735 41.4015C32.5388 41.2528 32.6015 41.038 32.9385 39.4984C33.259 38.0414 33.51 36.5316 33.7843 34.4106C33.847 33.9282 33.9395 33.2575 33.9891 32.9173C34.0916 32.2003 34.0816 32.1178 33.8636 31.8832C33.6852 31.6883 33.444 31.6157 33.1829 31.6717Z"
                fill="black"
              />
              <path
                d="M27.9696 34.1826C27.8209 34.2256 27.6227 34.4039 27.5533 34.5559C27.4971 34.6814 27.4906 34.8103 27.4906 36.3764C27.4906 38.1537 27.464 38.8575 27.3551 40.0435C27.279 40.8695 27.289 40.9586 27.4774 41.18C27.7878 41.5401 28.3792 41.4741 28.6105 41.0511C28.6798 40.929 28.6997 40.8134 28.7492 40.3111C28.8683 39.0624 28.8947 38.3718 28.8947 36.5415C28.8947 34.5593 28.8947 34.5757 28.703 34.3775C28.5082 34.1761 28.2372 34.1033 27.9696 34.1826Z"
                fill="black"
              />
              <path
                d="M37.4017 34.4437C37.1739 34.4866 36.9988 34.6188 36.8964 34.8235C36.87 34.8765 36.7477 35.2333 36.6254 35.6165C35.9581 37.7045 35.7532 38.21 34.9338 39.852L34.4548 40.8167L34.468 41.0149C34.4846 41.2594 34.5969 41.4411 34.8117 41.5667C35.0825 41.7252 35.4592 41.6724 35.6773 41.4411C35.7698 41.3387 36.6288 39.6405 36.9063 39.0028C37.306 38.0877 37.4382 37.7144 38.046 35.818C38.2112 35.3027 38.2343 35.2035 38.2179 35.045C38.1749 34.6452 37.8048 34.3677 37.4017 34.4437Z"
                fill="black"
              />
            </svg>
          </div>
        )}
        <BarChart
          ref={ref}
          yAxisWidth={maxNumber.length * (window.innerWidth >= 520 ? 8.8 : 8)}
          onTouchStart={() =>
            tips.handClickChart ? setTips("handClickChart") : null
          }
          onMouseEnter={() =>
            tips.handClickChart ? setTips("handClickChart") : null
          }
          showAnimation={true}
          barCategoryGap="25%"
          dir="ltr"
          className="mt-4"
          data={inView ? chartData : chartDataAnim}
          index="name"
          categories={data.map((e) => e.name)}
          colors={["blue", "teal", "amber", "purple"]}
          valueFormatter={dataFormatter}
        />
      </div>
      {chartDataQuality.length > 0 && (
        <div className="mt-5 relative">
          <div className="flex items-center space-x-2 space-x-reverse group">
            <h3 className="text-2xl font-semibold text-tremor-content-strong">
              كفاءة الاهداف
            </h3>
            <div className="relative">
              <svg
                className="mt-1"
                width="18px"
                height="18px"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M50 64C45.4766 64 41.6667 67.8099 41.6667 72.3333C41.6667 76.8567 45.4766 80.6667 50 80.6667C54.5234 80.6667 58.3334 76.8567 58.3334 72.3333C58.3334 67.8099 54.5234 64 50 64Z"
                  className="fill-gray-600"
                />
                <path
                  className="fill-gray-600"
                  d="M46.3478 18.5644C39.9537 19.974 34.8211 25.0939 33.5481 31.6806C33.3819 32.5402 33.3867 33.4241 33.5621 34.2819C33.7376 35.1396 34.0803 35.9544 34.5706 36.6798C35.061 37.4051 35.6894 38.0267 36.42 38.5091C37.1506 38.9916 37.9691 39.3254 38.8287 39.4915C39.6883 39.6576 40.5722 39.6528 41.4299 39.4773C42.2876 39.3019 43.1024 38.9592 43.8277 38.4688C44.5529 37.9785 45.1745 37.3501 45.657 36.6195C46.1394 35.8889 46.4732 35.0705 46.6393 34.2109C46.9383 32.6636 48.187 31.5849 49.7613 31.5136C51.3355 31.4423 52.6763 32.4036 53.114 33.9175C53.5518 35.4314 52.931 36.9602 51.5615 37.7401C50.9794 38.0867 50.4535 38.5201 50.002 39.0252C50.0018 39.0254 50.0016 39.0255 50.0014 39.0257C44.4973 42.5272 41.5306 48.9659 42.4454 55.4249C42.6933 57.1755 43.6265 58.7559 45.0396 59.8185C46.4528 60.8811 48.2302 61.3387 49.9808 61.0909C50.8476 60.9681 51.6818 60.6759 52.4357 60.2307C53.1896 59.7856 53.8485 59.1963 54.3746 58.4965C54.9008 57.7968 55.2839 57.0002 55.5022 56.1524C55.7206 55.3045 55.7697 54.422 55.6469 53.5551C55.4612 52.2435 56.0404 50.9864 57.1581 50.2754C57.6715 49.9476 58.1376 49.551 58.5434 49.0967C64.9437 45.2192 68.0109 37.4354 65.9228 30.2139C63.7931 22.8487 56.8169 17.8467 49.1578 18.1937C48.2004 18.2371 47.2613 18.363 46.3478 18.5644Z"
                />
                <path
                  className="stroke-gray-600"
                  d="M50 96C24.5949 96 4 75.4053 4 50C4 24.5949 24.5949 4 50 4C75.4053 4 96 24.5949 96 50C96 75.4053 75.4053 96 50 96Z"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="absolute  -top-full left-0 -translate-x-1/2 -translate-y-[60%] opacity-0 px-3 py-2 rounded-lg bg-white shadow-md text-sm w-min whitespace-nowrap duration-300 group-hover:opacity-100 group-hover:-translate-y-[80%]">
                كفاءة الأهداف تعتمد على المدة ومدى الربح
              </div>
            </div>
          </div>
          {tips.handClickChart2 && (
            <div className="absolute z-20 pointer-events-none select-none top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
              <div className="relative">
                <div className="rim1"></div>
                <div className="rim2"></div>
              </div>
              <svg
                className="hand_click drop-shadow-md"
                width="35"
                height="35"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.1666 0.503702C25.3407 0.566474 24.5742 0.801044 23.7812 1.24045C22.0039 2.22168 20.5899 4.03215 19.9126 6.19943C19.7209 6.80733 19.7077 6.86019 19.6086 7.38879C19.298 9.09355 19.3245 10.3952 19.7573 14.3069C19.8894 15.5128 20.0811 17.5644 20.1603 18.6183C20.2198 19.4046 20.2198 22.5004 20.1603 23.1281C20.048 24.3208 19.8894 25.3449 19.6714 26.2501C19.5359 26.8217 19.2815 27.6543 19.2287 27.7138C19.2188 27.7269 19.0337 27.6046 18.8223 27.4395C16.7971 25.8768 14.7223 24.7734 13.001 24.3504C12.1784 24.1489 11.957 24.1226 11.1014 24.1226C10.3877 24.1226 10.2919 24.1291 9.90868 24.2116C8.45502 24.519 7.2987 25.226 6.19854 26.4781C5.66993 27.0794 4.99595 28.087 4.61271 28.847C4.3418 29.3822 4.20635 29.9537 4.23939 30.4426C4.32528 31.7576 5.51465 32.9436 7.69845 33.8918C9.11909 34.5063 10.9263 35.0051 12.8788 35.3224C13.5131 35.4247 13.6552 35.4677 13.9889 35.6626C14.6628 36.059 15.426 36.7859 17.2233 38.7483C18.4754 40.1128 19.3807 41.0478 20.0051 41.6128L20.4444 42.0125L20.352 42.2173C20.1471 42.6766 20.0348 43.2944 20.0711 43.7768C20.1471 44.7546 20.6262 45.7327 21.4555 46.5916C22.4597 47.6388 23.5104 48.1971 25.3044 48.6465C25.9519 48.8084 26.9066 48.9901 27.6698 49.0958C28.7899 49.2478 30.4021 49.3239 31.5254 49.2776C33.5307 49.1916 34.7961 48.9141 35.8633 48.3294C38.1428 47.0739 39.0283 45.5343 38.4335 43.8427C38.3708 43.6612 38.3146 43.4893 38.3146 43.4595C38.3114 43.4299 38.4006 43.3307 38.5228 43.2317C39.3521 42.5675 40.4257 41.5203 41.0799 40.7372C42.811 38.6625 43.9939 36.4191 44.8298 33.6341C45.3154 32.0053 45.7019 29.9437 45.8275 28.2952C45.8837 27.5519 45.8506 26.0981 45.7646 25.5398C45.4806 23.7195 44.9024 22.0774 44.1161 20.8683C42.9565 19.0809 41.4268 18.1558 39.0944 17.8222L38.8202 17.7857L38.6252 17.3828C37.525 15.123 35.143 13.5834 32.2786 13.2795C31.8755 13.2365 31.598 13.2299 30.9736 13.2464C30.5376 13.2596 30.1278 13.2728 30.0651 13.2762L29.9495 13.2828V12.4899C29.9527 9.76093 29.9858 8.91845 30.2171 5.89879C30.2633 5.29089 30.3096 4.59049 30.3195 4.34601C30.3658 3.16985 30.0254 2.2448 29.2821 1.53778C28.9848 1.25366 28.7899 1.1149 28.4298 0.936499C27.9342 0.688714 27.5443 0.582994 26.8935 0.513614C26.5863 0.48388 26.4672 0.480575 26.1666 0.503702ZM27.4783 1.9012C28.4066 2.13907 28.9351 2.92537 28.9418 4.06519C28.9418 4.22707 28.8988 4.89114 28.8426 5.53537C28.6049 8.40637 28.5619 9.50984 28.5619 12.7872C28.5619 15.5624 28.5718 15.8828 28.6974 16.9665C28.9021 18.7605 29.4308 20.3926 30.2469 21.7735C30.4913 22.1864 30.9571 22.8571 30.9803 22.834C30.9902 22.8274 30.9439 22.6524 30.8778 22.4475C30.3954 20.8848 30.075 18.5027 29.9659 15.6483C29.9462 15.1527 29.9363 14.7397 29.9428 14.7331C30.0485 14.6274 32.1597 14.5977 32.7247 14.6968C34.241 14.9644 35.4635 15.569 36.3456 16.4941C36.9436 17.1217 37.2773 17.6835 37.6143 18.6349C38.1296 20.0885 38.2982 20.5346 38.5889 21.2284C38.8102 21.7504 39.0151 22.1667 39.2529 22.573C39.4545 22.9133 39.7716 23.3659 39.8806 23.4584L39.9534 23.5245L39.9303 23.4584C39.8575 23.2734 39.7022 22.5862 39.5834 21.9222C39.3521 20.6304 39.1407 19.3121 39.1638 19.289C39.2034 19.2494 39.8211 19.3815 40.2408 19.5203C42.4576 20.2471 43.7593 22.1633 44.3374 25.553C44.6084 27.1388 44.4267 29.3722 43.8221 31.9426C42.7879 36.3398 40.8454 39.5445 37.6606 42.1149C36.8478 42.7724 36.4876 42.997 35.9029 43.2118C34.6342 43.6843 32.9461 43.889 30.6597 43.8494C28.5685 43.8131 26.6788 43.5818 25.1161 43.1655C23.9928 42.8649 22.8892 42.2173 21.5578 41.0809C21.0524 40.6447 19.3807 38.9796 18.4688 37.995C18.0823 37.5755 17.4215 36.8884 17.0019 36.4654C15.9843 35.438 15.4392 34.9589 14.8346 34.5657C14.2697 34.2024 13.8831 34.0471 13.3149 33.9644C12.8292 33.8918 11.8678 33.7266 11.6035 33.6638C10.3514 33.3797 9.67743 33.1914 8.85477 32.9007C7.62907 32.4646 6.69411 31.9393 6.19523 31.3975C5.94083 31.1232 5.8285 30.9382 5.74261 30.6639C5.65671 30.3831 5.67323 29.9603 5.77565 29.6993C5.97718 29.1937 6.73044 28.0144 7.2095 27.4559C8.13126 26.3789 9.11578 25.7579 10.2721 25.5266C12.413 25.0937 15.089 26.2105 18.449 28.9395C19.2155 29.5638 19.2617 29.5968 19.4732 29.6134C19.711 29.6331 19.9852 29.5077 20.1042 29.3292C20.2958 29.0353 20.7749 27.6509 21.0094 26.7292C21.1812 26.0419 21.2869 25.4903 21.4093 24.6411C21.5843 23.3989 21.6207 22.7778 21.6207 20.9475C21.6239 18.7043 21.5513 17.6867 21.1119 13.6462C20.8674 11.3765 20.8145 10.6628 20.8112 9.58581C20.8112 8.42949 20.9102 7.64319 21.1746 6.70161C21.6207 5.13562 22.4664 3.85044 23.626 2.97493C24.8518 2.05317 26.3879 1.62368 27.4783 1.9012ZM22.1658 43.3242C23.5335 44.2326 24.6733 44.6226 26.9099 44.9463C29.933 45.3857 33.2202 45.3261 35.4172 44.8009C35.8666 44.6919 36.5241 44.4771 36.8312 44.3351L37.0724 44.226L37.1187 44.3351C37.2145 44.5631 37.2508 44.8735 37.2079 45.118C37.1022 45.726 36.6397 46.2413 35.6881 46.8095C34.3469 47.6092 33.2731 47.8701 31.1223 47.9131C29.0707 47.9559 27.0718 47.7182 25.3407 47.2292C24.4685 46.9813 23.8869 46.7237 23.2858 46.3173C22.1063 45.5211 21.4851 44.6952 21.4224 43.8362C21.3959 43.4695 21.5215 42.898 21.614 42.9574C21.6371 42.9706 21.885 43.1357 22.1658 43.3242Z"
                  fill="black"
                />
                <path
                  d="M33.1829 31.6717C32.988 31.7179 32.7601 31.9261 32.6973 32.1245C32.651 32.2797 32.6214 32.4614 32.3108 34.774C32.0035 37.0569 31.7359 38.5337 31.323 40.2551C31.1512 40.9621 31.1512 41.0412 31.3461 41.3222C31.5575 41.6328 32.0763 41.6723 32.3735 41.4015C32.5388 41.2528 32.6015 41.038 32.9385 39.4984C33.259 38.0414 33.51 36.5316 33.7843 34.4106C33.847 33.9282 33.9395 33.2575 33.9891 32.9173C34.0916 32.2003 34.0816 32.1178 33.8636 31.8832C33.6852 31.6883 33.444 31.6157 33.1829 31.6717Z"
                  fill="black"
                />
                <path
                  d="M27.9696 34.1826C27.8209 34.2256 27.6227 34.4039 27.5533 34.5559C27.4971 34.6814 27.4906 34.8103 27.4906 36.3764C27.4906 38.1537 27.464 38.8575 27.3551 40.0435C27.279 40.8695 27.289 40.9586 27.4774 41.18C27.7878 41.5401 28.3792 41.4741 28.6105 41.0511C28.6798 40.929 28.6997 40.8134 28.7492 40.3111C28.8683 39.0624 28.8947 38.3718 28.8947 36.5415C28.8947 34.5593 28.8947 34.5757 28.703 34.3775C28.5082 34.1761 28.2372 34.1033 27.9696 34.1826Z"
                  fill="black"
                />
                <path
                  d="M37.4017 34.4437C37.1739 34.4866 36.9988 34.6188 36.8964 34.8235C36.87 34.8765 36.7477 35.2333 36.6254 35.6165C35.9581 37.7045 35.7532 38.21 34.9338 39.852L34.4548 40.8167L34.468 41.0149C34.4846 41.2594 34.5969 41.4411 34.8117 41.5667C35.0825 41.7252 35.4592 41.6724 35.6773 41.4411C35.7698 41.3387 36.6288 39.6405 36.9063 39.0028C37.306 38.0877 37.4382 37.7144 38.046 35.818C38.2112 35.3027 38.2343 35.2035 38.2179 35.045C38.1749 34.6452 37.8048 34.3677 37.4017 34.4437Z"
                  fill="black"
                />
              </svg>
            </div>
          )}
          <BarChart
            onTouchStart={() =>
              tips.handClickChart2 ? setTips("handClickChart2") : null
            }
            onMouseEnter={() =>
              tips.handClickChart2 ? setTips("handClickChart2") : null
            }
            ref={refQuality}
            showAnimation={true}
            maxValue={100}
            minValue={0}
            enableLegendSlider={true}
            barCategoryGap="25%"
            dir="ltr"
            className="mt-4"
            data={inViewQuality ? chartDataQuality : chartDataQualityAnim}
            index="name"
            categories={data.map((e) => e.name)}
            colors={["blue", "teal", "amber", "purple"]}
            valueFormatter={dataFormatter2}
          />
        </div>
      )}
    </>
  );
}
