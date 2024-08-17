import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Menu() {
  const path = usePathname();
  const home = path == "/";
  const mean = path.startsWith("/mean");
  const more = path.startsWith("/more");
  const donate = path.startsWith("/donate");
  return (
    <nav
      style={{
        boxShadow: "0px 3px 15px rgba(0, 0, 0, 0.25)",
      }}
      className={`w-full h-16 duration-500 bg-white/60 fixed backdrop-blur-xl z-10 not-suport-glass px-6 xs:px-0 ${
        !home && !mean && !more && !donate ? "-bottom-10" : "bottom-10 "
      }`}
    >
      <div className="max-w-lg w-full mx-auto flex justify-between items-center h-full">
        <div className="noSelect flex px-1 items-center flex-col cursor-pointer relative">
          <Link
            aria-label="الصفحة الرئيسية"
            href={`/`}
            className="w-full absolute h-full "
          />
          <svg
            width="28"
            height="28"
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={`${home ? "fill-second" : "fill-transparent"} ${
                home ? "stroke-second" : "stroke-gray-500"
              }`}
              d="M15.4415 40.3036L15.4414 40.3036L15.4315 40.3077C15.0337 40.4735 14.6546 40.7114 14.3363 41.0297C13.6946 41.6714 13.3167 42.5534 13.3167 43.4533C13.3167 44.3839 13.6975 45.2382 14.3363 45.877C14.9888 46.5295 15.8485 46.87 16.76 46.87C17.6488 46.87 18.5073 46.5267 19.157 45.877C19.7958 45.2382 20.1767 44.3839 20.1767 43.4533C20.1767 42.5534 19.7988 41.6714 19.157 41.0297C19.1522 41.0249 19.1471 41.0198 19.1417 41.0143C19.0513 40.9235 18.8712 40.7426 18.6353 40.6083C18.4423 40.4658 18.2315 40.3643 18.0321 40.2958C17.1921 39.9655 16.2803 39.9681 15.4415 40.3036ZM19.1841 30.3916L19.1709 30.3769L19.157 30.363C19.1522 30.3582 19.1471 30.3531 19.1417 30.3476C19.0513 30.2568 18.8712 30.0759 18.6353 29.9417C18.4513 29.8058 18.251 29.7072 18.06 29.6389C17.8404 29.536 17.6073 29.4714 17.4089 29.4368C16.3 29.2011 15.1179 29.5814 14.3363 30.363C14.0106 30.6887 13.7606 31.0389 13.5838 31.4944C13.4207 31.8887 13.3167 32.3299 13.3167 32.7867C13.3167 33.7173 13.6975 34.5715 14.3363 35.2103C14.6546 35.5286 15.0336 35.7665 15.4315 35.9323C15.8322 36.0993 16.2767 36.2033 16.76 36.2033C17.6488 36.2033 18.5073 35.8601 19.157 35.2103C19.8095 34.5578 20.15 33.6981 20.15 32.7867C20.15 32.3685 20.0864 31.923 19.9096 31.4943C19.725 31.02 19.4371 30.6726 19.1841 30.3916ZM24.0752 42.6828L24.0538 42.747L24.0442 42.8139C24.0415 42.8328 24.0386 42.8524 24.0357 42.8726C24.0126 43.0299 23.9833 43.2296 23.9833 43.4533C23.9833 44.3839 24.3642 45.2382 25.003 45.877C25.6527 46.5267 26.5112 46.87 27.4 46.87C27.8833 46.87 28.3278 46.7659 28.7285 46.599C29.1264 46.4332 29.5054 46.1953 29.8237 45.877C30.4762 45.2245 30.8167 44.3648 30.8167 43.4533C30.8167 42.5725 30.4789 41.6849 29.8237 41.0297C28.8532 40.0592 27.3564 39.7976 26.1049 40.3049L26.1049 40.3049L26.0982 40.3077C25.7003 40.4735 25.3213 40.7114 25.003 41.0297C24.8401 41.1926 24.7115 41.3534 24.6084 41.4822L24.601 41.4915L24.5514 41.5535L24.5158 41.6246L24.5154 41.6255L24.5149 41.6265L24.5144 41.6274L24.514 41.6283L24.5135 41.6293L24.513 41.6302L24.5126 41.6312L24.5121 41.6321L24.5116 41.633L24.5112 41.634L24.5107 41.6349L24.5102 41.6358L24.5098 41.6368L24.5093 41.6377L24.5088 41.6387L24.5083 41.6396L24.5079 41.6405L24.5074 41.6415L24.5069 41.6424L24.5065 41.6433L24.506 41.6443L24.5055 41.6452L24.5051 41.6462L24.5046 41.6471L24.5041 41.648L24.5037 41.649L24.5032 41.6499L24.5027 41.6508L24.5023 41.6518L24.5018 41.6527L24.5013 41.6537L24.5008 41.6546L24.5004 41.6555L24.4999 41.6565L24.4994 41.6574L24.499 41.6583L24.4985 41.6593L24.498 41.6602L24.4976 41.6612L24.4971 41.6621L24.4966 41.663L24.4962 41.664L24.4957 41.6649L24.4952 41.6658L24.4948 41.6668L24.4943 41.6677L24.4938 41.6687L24.4933 41.6696L24.4929 41.6705L24.4924 41.6715L24.4919 41.6724L24.4915 41.6733L24.491 41.6743L24.4905 41.6752L24.4901 41.6762L24.4896 41.6771L24.4891 41.678L24.4887 41.679L24.4882 41.6799L24.4877 41.6808L24.4873 41.6818L24.4868 41.6827L24.4863 41.6837L24.4858 41.6846L24.4854 41.6855L24.4849 41.6865L24.4844 41.6874L24.484 41.6883L24.4835 41.6893L24.483 41.6902L24.4826 41.6912L24.4821 41.6921L24.4816 41.693L24.4812 41.694L24.4807 41.6949L24.4802 41.6958L24.4798 41.6968L24.4793 41.6977L24.4788 41.6987L24.4783 41.6996L24.4779 41.7005L24.4774 41.7015L24.4769 41.7024L24.4765 41.7033L24.476 41.7043L24.4755 41.7052L24.4751 41.7062L24.4746 41.7071L24.4741 41.708L24.4737 41.709L24.4732 41.7099L24.4727 41.7108L24.4723 41.7118L24.4718 41.7127L24.4713 41.7137L24.4708 41.7146L24.4704 41.7155L24.4699 41.7165L24.4694 41.7174L24.469 41.7183L24.4685 41.7193L24.468 41.7202L24.4676 41.7212L24.4671 41.7221L24.4666 41.723L24.4662 41.724L24.4657 41.7249L24.4652 41.7258L24.4648 41.7268L24.4643 41.7277L24.4638 41.7287L24.4633 41.7296L24.4629 41.7305L24.4624 41.7315L24.4619 41.7324L24.4615 41.7333L24.461 41.7343L24.4605 41.7352L24.4601 41.7362L24.4596 41.7371L24.4591 41.738L24.4587 41.739L24.4582 41.7399L24.4577 41.7408L24.4573 41.7418L24.4568 41.7427L24.4563 41.7437L24.4558 41.7446L24.4554 41.7455L24.4549 41.7465L24.4544 41.7474L24.454 41.7483L24.4535 41.7493L24.453 41.7502L24.4526 41.7512L24.4521 41.7521L24.4516 41.753L24.4512 41.754L24.4507 41.7549L24.4502 41.7558L24.4498 41.7568L24.4493 41.7577L24.4488 41.7587L24.4483 41.7596L24.4479 41.7605L24.4474 41.7615L24.4469 41.7624L24.4465 41.7633L24.446 41.7643L24.4455 41.7652L24.4451 41.7662L24.4446 41.7671L24.4441 41.768L24.4437 41.769L24.4432 41.7699L24.4427 41.7708L24.4423 41.7718L24.4418 41.7727L24.4413 41.7737L24.4408 41.7746L24.4404 41.7755L24.4399 41.7765L24.4394 41.7774L24.439 41.7783L24.4385 41.7793L24.438 41.7802L24.4376 41.7812L24.4371 41.7821L24.4366 41.783L24.4362 41.784L24.4357 41.7849L24.4352 41.7858L24.4348 41.7868L24.4343 41.7877L24.4338 41.7887L24.4333 41.7896L24.4329 41.7905L24.4324 41.7915L24.4319 41.7924L24.4315 41.7933L24.431 41.7943L24.4305 41.7952L24.4301 41.7962L24.4296 41.7971L24.4291 41.798L24.4287 41.799L24.4282 41.7999L24.4277 41.8008L24.4273 41.8018L24.4268 41.8027L24.4263 41.8037L24.4258 41.8046L24.4254 41.8055L24.4249 41.8065L24.4244 41.8074L24.424 41.8083L24.4235 41.8093L24.423 41.8102L24.4226 41.8112L24.4221 41.8121L24.4216 41.813L24.4212 41.814L24.4207 41.8149L24.4202 41.8158L24.4198 41.8168L24.4193 41.8177L24.4188 41.8187L24.4183 41.8196L24.4179 41.8205L24.4174 41.8215L24.4169 41.8224L24.4165 41.8233L24.416 41.8243L24.4155 41.8252L24.4151 41.8262L24.4146 41.8271L24.4141 41.828L24.4137 41.829L24.4132 41.8299L24.4127 41.8308L24.4123 41.8318L24.4118 41.8327L24.4113 41.8337L24.4108 41.8346L24.4104 41.8355L24.4099 41.8365L24.4094 41.8374L24.409 41.8383L24.4085 41.8393L24.408 41.8402L24.4076 41.8412L24.4071 41.8421L24.4066 41.843L24.4062 41.844L24.4057 41.8449L24.4052 41.8458L24.4048 41.8468L24.4043 41.8477L24.4038 41.8487L24.4033 41.8496L24.4029 41.8505L24.4024 41.8515L24.4019 41.8524L24.4015 41.8533L24.401 41.8543L24.4005 41.8552L24.4001 41.8562L24.3996 41.8571L24.3991 41.858L24.3987 41.859L24.3982 41.8599L24.3977 41.8608L24.3973 41.8618L24.3968 41.8627L24.3963 41.8637L24.3958 41.8646L24.3954 41.8655L24.3949 41.8665L24.3944 41.8674L24.394 41.8683L24.3935 41.8693L24.393 41.8702L24.3926 41.8712L24.3921 41.8721L24.3916 41.873L24.3912 41.874L24.3907 41.8749L24.3902 41.8758L24.3898 41.8768L24.3893 41.8777L24.3888 41.8787L24.3883 41.8796L24.3879 41.8805L24.3874 41.8815L24.3869 41.8824L24.3865 41.8833L24.386 41.8843L24.3855 41.8852L24.3851 41.8862L24.3846 41.8871L24.3841 41.888L24.3837 41.889L24.3832 41.8899L24.3827 41.8908L24.3823 41.8918L24.3818 41.8927L24.3813 41.8937L24.3808 41.8946L24.3804 41.8955L24.3799 41.8965L24.3794 41.8974L24.379 41.8983L24.3785 41.8993L24.378 41.9002L24.3776 41.9012L24.3771 41.9021L24.3766 41.903L24.3762 41.904L24.3757 41.9049L24.3752 41.9058L24.3748 41.9068L24.3743 41.9077L24.3738 41.9087L24.3733 41.9096L24.3729 41.9105L24.3724 41.9115L24.3719 41.9124L24.3715 41.9133L24.371 41.9143L24.3705 41.9152L24.3701 41.9162L24.3696 41.9171L24.3691 41.918L24.3687 41.919L24.3682 41.9199L24.3677 41.9208L24.3673 41.9218L24.3668 41.9227L24.3663 41.9237L24.3658 41.9246L24.3654 41.9255L24.3649 41.9265L24.3644 41.9274L24.364 41.9283L24.3635 41.9293L24.363 41.9302L24.3626 41.9312L24.3621 41.9321L24.3616 41.933L24.3612 41.934L24.3607 41.9349L24.3602 41.9358L24.3598 41.9368L24.3593 41.9377L24.3588 41.9387L24.3583 41.9396L24.3579 41.9405L24.3574 41.9415L24.3569 41.9424L24.3565 41.9433L24.356 41.9443L24.3555 41.9452L24.3551 41.9462L24.3546 41.9471L24.3541 41.948L24.3537 41.949L24.3532 41.9499L24.3527 41.9508L24.3523 41.9518L24.3518 41.9527L24.3513 41.9537L24.3508 41.9546L24.3504 41.9555L24.3499 41.9565L24.3494 41.9574L24.349 41.9583L24.3485 41.9593L24.348 41.9602L24.3476 41.9612L24.3471 41.9621L24.3466 41.963L24.3462 41.964L24.3457 41.9649L24.3452 41.9658L24.3448 41.9668L24.3443 41.9677L24.3438 41.9687L24.3433 41.9696L24.3429 41.9705L24.3424 41.9715L24.3419 41.9724L24.3415 41.9733L24.341 41.9743L24.3405 41.9752L24.3401 41.9762L24.3396 41.9771L24.3391 41.978L24.3387 41.979L24.3382 41.9799L24.3377 41.9808L24.3373 41.9818L24.3368 41.9827L24.3363 41.9837L24.3358 41.9846L24.3354 41.9855L24.3349 41.9865L24.3344 41.9874L24.334 41.9883L24.3335 41.9893L24.333 41.9902L24.3326 41.9912L24.3321 41.9921L24.3316 41.993L24.3312 41.994L24.3307 41.9949L24.3302 41.9958L24.3298 41.9968L24.3293 41.9977L24.3288 41.9987L24.3283 41.9996L24.3279 42.0005L24.3274 42.0015L24.3269 42.0024L24.3265 42.0033L24.326 42.0043L24.3255 42.0052L24.3251 42.0062L24.3246 42.0071L24.3241 42.008L24.3237 42.009L24.3232 42.0099L24.3227 42.0108L24.3223 42.0118L24.3218 42.0127L24.3213 42.0137L24.3208 42.0146L24.3204 42.0155L24.3199 42.0165L24.3194 42.0174L24.319 42.0183L24.3185 42.0193L24.318 42.0202L24.3176 42.0212L24.3171 42.0221L24.3166 42.023L24.3162 42.024L24.3157 42.0249L24.3152 42.0258L24.3148 42.0268L24.3143 42.0277L24.3138 42.0287L24.3133 42.0296L24.3129 42.0305L24.3124 42.0315L24.3119 42.0324L24.3115 42.0333L24.311 42.0343L24.3105 42.0352L24.3101 42.0362L24.3096 42.0371L24.3091 42.038L24.3087 42.039L24.3082 42.0399L24.3077 42.0408L24.3073 42.0418L24.3068 42.0427L24.3063 42.0437L24.3058 42.0446L24.3054 42.0455L24.3049 42.0465L24.3044 42.0474L24.304 42.0483L24.3035 42.0493L24.303 42.0502L24.3026 42.0512L24.3021 42.0521L24.3016 42.053L24.3012 42.054L24.3007 42.0549L24.3002 42.0558L24.2998 42.0568L24.2993 42.0577L24.2988 42.0587L24.2983 42.0596L24.2979 42.0605L24.2974 42.0615L24.2969 42.0624L24.2965 42.0633L24.296 42.0643L24.2955 42.0652L24.2951 42.0662L24.2946 42.0671L24.2941 42.068L24.2937 42.069L24.2932 42.0699L24.2927 42.0708L24.2923 42.0718L24.2918 42.0727L24.2913 42.0737L24.2908 42.0746L24.2904 42.0755L24.2899 42.0765L24.2894 42.0774L24.289 42.0783L24.2885 42.0793L24.288 42.0802L24.2876 42.0812L24.2871 42.0821L24.2866 42.083L24.2862 42.084L24.2857 42.0849L24.2852 42.0858L24.2848 42.0868L24.2843 42.0877L24.2838 42.0887L24.2833 42.0896L24.2829 42.0905L24.2824 42.0915L24.2819 42.0924L24.2815 42.0933L24.281 42.0943L24.2805 42.0952L24.2801 42.0962L24.2796 42.0971L24.2791 42.098L24.2787 42.099L24.2782 42.0999L24.2777 42.1008L24.2773 42.1018L24.2768 42.1027L24.2763 42.1037L24.2758 42.1046L24.252 42.1523L24.2352 42.2028L24.1552 42.4428L24.0752 42.6828ZM29.8508 30.3916L29.8376 30.3769L29.8237 30.363C28.5441 29.0834 26.2826 29.0834 25.003 30.363C24.3612 31.0048 23.9833 31.8867 23.9833 32.7867C23.9833 33.7173 24.3642 34.5715 25.003 35.2103C25.6527 35.8601 26.5112 36.2033 27.4 36.2033C28.3115 36.2033 29.1712 35.8628 29.8237 35.2103C30.4762 34.5578 30.8167 33.6981 30.8167 32.7867C30.8167 32.3685 30.7531 31.923 30.5762 31.4943C30.3917 31.02 30.1037 30.6726 29.8508 30.3916ZM39.3951 40.3077L39.3951 40.3077L39.3885 40.3049C38.1463 39.8014 36.6168 40.0517 35.6649 41.0345C35.0128 41.6892 34.6767 42.5746 34.6767 43.4533C34.6767 44.3648 35.0172 45.2245 35.6697 45.877C35.9879 46.1953 36.367 46.4332 36.7649 46.599C37.1616 46.7643 37.6062 46.87 38.0667 46.87C38.9781 46.87 39.8378 46.5295 40.4903 45.877C41.1428 45.2245 41.4833 44.3648 41.4833 43.4533C41.4833 42.5725 41.1455 41.6849 40.4903 41.0297C40.1721 40.7114 39.793 40.4735 39.3951 40.3077ZM16.3333 1.75H37.6667C44.6125 1.75 50.25 7.38755 50.25 14.3333V41C50.25 47.9458 44.6125 53.5833 37.6667 53.5833H16.3333C9.38755 53.5833 3.75 47.9458 3.75 41V14.3333C3.75 7.38755 9.38755 1.75 16.3333 1.75ZM13.2367 18.5467C13.2367 21.7368 15.8417 24.31 19 24.31H35C38.1901 24.31 40.7633 21.705 40.7633 18.5467V15.88C40.7633 12.6899 38.1583 10.1167 35 10.1167H19C15.8099 10.1167 13.2367 12.7217 13.2367 15.88V18.5467ZM40.4903 35.2103C40.8315 34.8692 41.0709 34.4918 41.239 34.0885C41.4043 33.6917 41.51 33.2471 41.51 32.7867C41.51 31.8867 41.1321 31.0048 40.4903 30.363C39.2108 29.0834 36.9492 29.0834 35.6697 30.363C35.0279 31.0048 34.65 31.8867 34.65 32.7867C34.65 33.7173 35.0308 34.5715 35.6697 35.2103C36.3194 35.8601 37.1778 36.2033 38.0667 36.2033C38.9781 36.2033 39.8378 35.8628 40.4903 35.2103Z"
              strokeWidth="3"
            />
          </svg>
          <p
            className={`${
              home ? "text-second" : "text-gray-500"
            } mt-1 text-xs `}
          >
            الرئيسية
          </p>
        </div>
        <div className="noSelect flex px-1 items-center flex-col cursor-pointer relative">
          <Link
            aria-label="المتوسط الحسابي"
            href={`/mean`}
            className="w-full absolute h-full "
          />
          <svg
            width="28"
            height="28"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={mean ? "stroke-second" : "stroke-gray-500"}
              d="M34.2083 11.2917L11.2917 34.2083M15.4583 19.625V11.2917M11.2917 15.4583H19.625M25.875 30.0417H34.2083M14 41.5H31.5C35.0004 41.5 36.7504 41.5 38.0875 40.8188C39.2635 40.2196 40.2196 39.2635 40.8188 38.0875C41.5 36.7504 41.5 35.0004 41.5 31.5V14C41.5 10.4997 41.5 8.7495 40.8188 7.41256C40.2196 6.23654 39.2635 5.28042 38.0875 4.68121C36.7504 4 35.0004 4 31.5 4H14C10.4997 4 8.7495 4 7.41256 4.68121C6.23654 5.28042 5.28042 6.23654 4.68121 7.41256C4 8.7495 4 10.4997 4 14V31.5C4 35.0004 4 36.7504 4.68121 38.0875C5.28042 39.2635 6.23654 40.2196 7.41256 40.8188C8.7495 41.5 10.4997 41.5 14 41.5Z"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p
            className={`${
              mean ? "text-second" : "text-gray-500"
            } mt-1 text-xs `}
          >
            المتوسط الحسابي
          </p>
        </div>
        <div className="noSelect flex px-1 items-center flex-col cursor-pointer relative">
          <Link
            aria-label="حساب التطهير"
            href={`/donate`}
            className="w-full absolute h-full "
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="#000000"
          >
            <path
            className={`fill-none ${donate ? "stroke-second" : "stroke-gray-500"}`}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              d="M3,25l2.6-4.2c1.5-2.3,4-3.8,6.8-3.8H19v0c0,2.2-1.8,4-4,4h-2"
            />
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              className={`fill-none ${donate ? "stroke-second" : "stroke-gray-500"}`}
              d="M15,21h8l1.2-1.6c1.1-1.5,2.9-2.4,4.8-2.4h0l-2.7,4.8c-1.4,2.6-4.2,4.2-7.1,4.2h0c-4.7,0-9.3,1.4-13.2,4l0,0"
            />
            <circle
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              className={`fill-none ${donate ? "stroke-second" : "stroke-gray-500"}`}
              cx="20.5"
              cy="10.5"
              r="3.5"
            />
            <path
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              className={`fill-none ${donate ? "stroke-second" : "stroke-gray-500"}`}
              d="M19,7.3C18.9,5.5,17.4,4,15.5,4C13.6,4,12,5.6,12,7.5s1.6,3.5,3.5,3.5c0.5,0,1-0.1,1.5-0.3"
            />
          </svg>
          <p
            className={`${
              donate ? "text-second" : "text-gray-500"
            } mt-1 text-xs `}
          >
            حساب التطهير
          </p>
        </div>
        <div className="noSelect flex px-1 items-center flex-col cursor-pointer relative">
          <Link
            aria-label="المزيد"
            href={`/more`}
            className="w-full absolute h-full "
          />
          <svg
            width="25"
            height="25"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className={more ? "fill-second" : "fill-gray-500"}
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.2999 5.40002C1.97443 5.40002 0.899902 6.47455 0.899902 7.80002C0.899902 9.1255 1.97443 10.2 3.2999 10.2H41.6999C43.0254 10.2 44.0999 9.1255 44.0999 7.80002C44.0999 6.47455 43.0254 5.40002 41.6999 5.40002H3.2999ZM0.899902 22.2C0.899902 20.8745 1.97443 19.8 3.2999 19.8H41.6999C43.0254 19.8 44.0999 20.8745 44.0999 22.2C44.0999 23.5255 43.0254 24.6 41.6999 24.6H3.2999C1.97443 24.6 0.899902 23.5255 0.899902 22.2ZM0.899902 36.6C0.899902 35.2745 1.97443 34.2 3.2999 34.2H41.6999C43.0254 34.2 44.0999 35.2745 44.0999 36.6C44.0999 37.9255 43.0254 39 41.6999 39H3.2999C1.97443 39 0.899902 37.9255 0.899902 36.6Z"
            />
          </svg>
          <p
            className={`${
              more ? "text-second" : "text-gray-500"
            } mt-1 text-xs `}
          >
            المزيد
          </p>
        </div>
      </div>
    </nav>
  );
}
