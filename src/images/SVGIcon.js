import React from "react";

const getViewBox = name => {
  switch (name) {
    case "projecticon":
      return "0 0 20 24";
    case "newnotificationicon":
      return "0 0 18 18";
    case "searchicon":
      return "0 0 18 18";
    case "toolicon":
      return "0 0 18 18";
    case "emptystar":
      return "0 0 20 19";
    case "clear":
      return "0 0 25 24";
    case "stock":
      return "0 0 12 9";
    case "info":
      return "0 0 16 16"
    case "check":
      return "0 0 24 22"
    case "workflow":
      return "0 0 24 24" 
    case "attention":
      return "0 0 24 22"
    case "eye":
      return "0 0 24 24"
    case "eyeCrossed":
      return "0 0 24 24"
    case "members":
      return "0 0 24 24"

    default: 
      return "0 0 18 18";
  }
};

const getPath = (name, props) => {
  switch (name) {
    case "dataseticon":
      return (
        <path
          {...props}
          // d="m 18 15.7 l 0 3.3 c 0 2.025 -3.9 3 -7.5 3 c -3.6 0 -7.5 -0.975 -7.5 -3 l 0 0 l 0 -3.3 c 1.725 1.275 4.65 1.8 7.5 1.8 c 2.85 0 5.775 -0.525 7.5 -1.8 l 0 0 Z m 0 -6 l 0 3.3 c 0 2.025 -3.9 3 -7.5 3 c -3.6 0 -7.5 -0.975 -7.5 -3 l 0 0 l 0 -3.3 c 1.725 1.275 4.65 1.8 7.5 1.8 c 2.85 0 5.775 -0.525 7.5 -1.8 l 0 0 Z m -7.5 -5.7 c 3.6 0 7.5 0.975 7.5 3 c 0 2.025 -3.9 3 -7.5 3 c -3.6 0 -7.5 -0.975 -7.5 -3 c 0 -2.025 3.9 -3 7.5 -1 Z"
          d="M12,0 C17.5202663,0 22,1.49324457 22,4 L22,4 L22,20 C22,22.5402768 17.5868833,24 12,24 C6.52266339,24 2.17351467,22.5969596 2.00506568,20.1481789 L2,20 L2,4 L2.00514101,3.8537164 C2.17607588,1.43526006 6.58797422,0 12,0 Z M12,16 C8.70211768,16 5.81322554,15.4913704 3.99960013,14.5520997 L4,20 C4,20.8366463 7.5171159,22 12,22 C16.378631,22 19.8358909,20.8901266 19.9943256,20.058882 L20,20 L20.000751,14.5519178 C18.1871473,15.4913048 15.2980952,16 12,16 Z M4,12 C4,12.8366463 7.5171159,14 12,14 C16.378631,14 19.8358909,12.8901266 19.9943256,12.058882 L20,12 L20.0011286,6.52711098 C18.1763026,7.47577408 15.2707986,8 12,8 C8.7298061,8 5.82477173,7.47596789 3.99988365,6.52763709 L4,12 Z M12,2 L11.6929681,2.00191586 C7.41460485,2.05528174 4,3.21181328 4,4 C4,4.80695307 7.5791408,6 12,6 C16.4208592,6 20,4.80695307 20,4 C20,3.19304693 16.4208592,2 12,2 L12,2 Z"

        />
      );
    case "projecticon":
      return (
        <path
          {...props}
          d="M20,0 L20,17.4142136 L13.4142136,24 L0,24 L0,0 L20,0 Z M18,2 L2,2 L2,22 L12,22 L12,16 L18,16 L18,2 Z M10,16 L10,18 L4,18 L4,16 L10,16 Z M16,11 L16,13 L4,13 L4,11 L16,11 Z M16,6 L16,8 L4,8 L4,6 L16,6 Z"
        />
      );
    case "searchicon":
      return (
        <path
          {...props}
          d="M12.5,11 L11.71,11 L11.43,10.73 C12.41,9.59 13,8.11 13,6.5 C13,2.91 10.09,0 6.5,0 C2.91,0 0,2.91 0,6.5 C0,10.09 2.91,13 6.5,13 C8.11,13 9.59,12.41 10.73,11.43 L11,11.71 L11,12.5 L16,17.49 L17.49,16 L12.5,11 Z M6.5,11 C4.01,11 2,8.99 2,6.5 C2,4.01 4.01,2 6.5,2 C8.99,2 11,4.01 11,6.5 C11,8.99 8.99,11 6.5,11 Z"
        />
      );
    case "newnotificationicon":
      return (
        // <circle cx="50" cy="50" r="50"/>
        <circle cx="12" cy="8" r="3" />
      );

    case "toolicon":
      return (
        <path
          {...props}
          d="M14.8554416,5.82520191 L12.1601058,3.13664718 L14.8554416,0.448092455 C14.2939133,0.112023114 13.6200794,0 12.9462454,0 C10.138604,0 7.89249089,2.24046227 7.89249089,5.04104012 C7.89249089,5.60115568 8.00479655,6.04924814 8.1171022,6.60936371 L0.704928853,12.0984963 C-0.193516401,12.770635 -0.193516401,14.0028892 0.48031754,14.787051 L3.06334765,17.4756057 C3.84948724,18.2597675 5.08484947,18.1477444 5.75868341,17.2515595 L11.2616606,9.858034 C11.8231889,9.97005712 12.3847172,10.0820802 12.9462454,10.0820802 C15.7538869,10.0820802 18,7.84161796 18,5.04104012 C18,4.36890143 17.8876943,3.69676275 17.663083,3.13664718 L14.8554416,5.82520191 Z"
        />
      );
    case "emptystar":
      return (
        <path
          {...props}
          d="M333,946.24 L325.81,945.62 L323,939 L320.19,945.63 L313,946.24 L318.46,950.97 L316.82,958 L323,954.27 L329.18,958 L327.55,950.97 L333,946.24 Z M323,952.4 L319.24,954.67 L320.24,950.39 L316.92,947.51 L321.3,947.13 L323,943.1 L324.71,947.14 L329.09,947.52 L325.77,950.4 L326.77,954.68 L323,952.4 Z"
        />
      );
    case "clear":
      return (
        <path
          {...props}
          d="M414.818649,936 C408.191232,936 402.818649,941.372583 402.818649,948 C402.818649,954.627417 408.191232,960 414.818649,960 C421.446066,960 426.818649,954.627417 426.818649,948 C426.799426,941.380562 421.438087,936.019223 414.818649,936 Z M419.768649,951.536 L418.354649,952.95 L414.818649,949.414 L411.282649,952.95 L409.868649,951.536 L413.404649,948 L409.868649,944.464 L411.282649,943.05 L414.818649,946.586 L418.354649,943.05 L419.768649,944.464 L416.232649,948 L419.768649,951.536 Z"
        />
      );
    case "stock":
      return (

          <path
            {...props}
            d="M376.499799,945 L365.499799,945 C365.314213,945 365.143936,945.102936 365.057518,945.267173 C364.971099,945.431411 364.982757,945.630002 365.087799,945.783 L370.587799,953.783 C370.681079,953.918659 370.835163,953.999705 370.999799,953.999705 C371.164434,953.999705 371.318518,953.918659 371.411799,953.783 L376.911799,945.783 C377.01684,945.630002 377.028498,945.431411 376.94208,945.267173 C376.855661,945.102936 376.685384,945 376.499799,945 Z"
          /> 
      ); 
      case "newprojecticon":
        return (
          <path
            {...props}
            d="M22,0 L22,17.4142136 L15.4142136,24 L2,24 L2,0 L22,0 Z M20,2 L4,2 L4,22 L14,22 L14,16 L20,16 L20,2 Z M12,16 L12,18 L6,18 L6,16 L12,16 Z M18,11 L18,13 L6,13 L6,11 L18,11 Z M18,6 L18,8 L6,8 L6,6 L18,6 Z"
          /> 
        );
        case "newtoolicon":
          return (
            <path
              {...props}
              d="M16.5562779,1.01681206 C17.3412833,0.95077776 18.1319289,1.07981681 18.8571872,1.39427652 L18.8571872,1.39427652 L20.0967396,1.93172544 L16.968201,5.0447198 L18.963699,7.03013492 L22.1455207,3.86245346 L22.6442409,5.19213243 C23.075825,6.34281441 23.1151599,7.60384655 22.7599063,8.76650254 C22.1274358,10.9493405 20.3389811,12.6029662 18.0616204,13.0719048 C17.2742261,13.1880056 16.4745376,13.1703475 15.6959917,13.0212567 L15.6959917,13.0212567 L15.6106757,13.0028796 L8.00581243,21.551533 C7.34216871,22.3691645 6.3803862,22.8837337 5.33851664,22.9859079 L5.33851664,22.9859079 L5.11411252,23.0014504 C3.98675745,23.0472034 2.89412626,22.6061642 2.09269152,21.7670852 L2.09269152,21.7670852 L1.94427368,21.5998964 C1.29739756,20.826996 0.961381281,19.839751 1.00353598,18.8311227 C1.04930114,17.7361075 1.53683795,16.7063725 2.35891658,15.9733822 L2.35891658,15.9733822 L8.758,10.333 L6.709,8.284 L4.7843054,8.9258331 L1.16901406,5.31054177 L5.03187801,1.44767782 L8.64716934,5.06296916 L8.005,6.988 L10.136,9.119 L10.9432086,8.40874264 L10.9086287,8.26927941 C10.8511416,8.00667175 10.81624,7.74195666 10.8044803,7.48065868 L10.8044803,7.48065868 L10.7993105,7.00329589 C10.837853,3.89873831 13.2266106,1.30830572 16.3434468,1.04058724 L16.3434468,1.04058724 Z M19.3312666,13.4554978 L21.7601958,15.8844944 C22.5520278,16.6603282 22.9982443,17.7222322 22.9982443,18.8307971 C22.9982443,19.9393619 22.5520278,21.0012659 21.7734241,21.7638713 C20.9975904,22.5557034 19.9356864,23.0019198 18.8271215,23.0019198 C17.792461,23.0019198 16.7984473,22.6132157 16.0450791,21.9230047 L15.8873993,21.7705192 L12.5351948,18.4183147 L13.8315018,17.1220077 L17.1902868,20.4808601 C17.6213055,20.9207668 18.2112522,21.1686648 18.8271215,21.1686648 C19.4429909,21.1686648 20.0329376,20.9207668 20.4771846,20.4676318 C20.9170913,20.0366131 21.1649893,19.4466664 21.1649893,18.8307971 C21.1649893,18.2765146 20.9641919,17.7432296 20.5984942,17.3231056 L20.4705367,17.1873819 L18.0349596,14.7518048 L19.3312666,13.4554978 Z M16.5658015,2.8594799 L16.3054183,2.88834979 C14.1771928,3.16961144 12.5835906,5.01270499 12.633387,7.21202108 C12.6281119,7.60477758 12.7011385,7.99464935 12.8482028,8.35887128 L12.8482028,8.35887128 L13.0912197,8.96073157 L3.57491426,17.3452947 C3.12712616,17.7445679 2.86024417,18.308254 2.83519191,18.9076751 C2.81211649,19.4597967 2.9960635,20.0002489 3.33147873,20.4017008 L3.33147873,20.4017008 L3.43952065,20.5237638 C3.85546876,20.9588287 4.43835832,21.1941114 5.03977213,21.1697033 C5.64118595,21.1452953 6.2030923,20.8635518 6.60922674,20.364664 L6.60922674,20.364664 L14.9935392,10.9387982 L15.5505876,11.102182 C16.2784058,11.315653 17.0438344,11.3689002 17.7424614,11.2674102 C19.3023279,10.9451599 20.5557977,9.78618742 21.0028513,8.24361997 C21.0685747,8.02846327 21.1144097,7.80902855 21.1404397,7.58798506 L21.1404397,7.58798506 L21.1526054,7.43711751 L18.9649605,9.6167253 L14.3698273,5.04587791 L16.5658015,2.8594799 Z M5.03187801,4.04101271 L3.76234895,5.31054177 L5.27936743,6.82756024 L6.23174337,6.51040714 L6.54889648,5.55803119 L5.03187801,4.04101271 Z"
            />
          );
        case "reviewsicon":
          return ( 
            <path
              {...props}
              d="M11,3.55271368e-15 C17.0322075,3.55271368e-15 22,3.97437127 22,9 C22,9.19397164 21.9925995,9.38637722 21.978023,9.5770487 C23.2665679,10.8047361 24,12.3485987 24,14 C24,15.6083904 23.3046663,17.1157926 22.0770935,18.3283051 L22,18.401 L22,23.618034 L16.548,20.892 L16.4107223,20.9122125 C16.0984947,20.9509307 15.7853656,20.9770413 15.4714497,20.9901463 L15,21 C11.9432595,21 9.14537734,19.8087021 7.49814363,17.8692765 L2,20.6178843 L2,14.166 L1.83136272,13.9656728 C0.719807753,12.595729 0.0783463698,10.998817 0.00672653571,9.31641722 L0.00672653571,9.31641722 L0,9 C0,3.97437127 4.96779252,3.55271368e-15 11,3.55271368e-15 Z M21.3888309,11.9782266 L21.3400716,12.0888747 C19.7973215,15.5612816 15.7252292,18 11,18 C10.9409172,18 10.8818789,17.9996057 10.8228884,17.9988186 C11.9977015,18.6306581 13.4483029,19 15,19 C15.3890899,19 15.77771,18.9754346 16.1657644,18.9272683 L16.5536268,18.8712706 L16.8733754,18.8186537 L20,20.382 L20,17.4981693 L20.3515862,17.1987119 C21.4205016,16.288282 22,15.166042 22,14 C22,13.2980698 21.7896042,12.6118743 21.3888309,11.9782266 Z M11,2 C5.98655285,2 2,5.18935243 2,9 C2,10.4812988 2.60688048,11.9020612 3.72996335,13.1015137 L3.72996335,13.1015137 L4,13.3899129 L4,17.381 L7.7248605,15.5200708 L8.09102488,15.6178617 C9.03279428,15.8693785 10.0089942,16 11,16 C16.0134472,16 20,12.8106476 20,9 C20,5.18935243 16.0134472,2 11,2 Z"
            />
          );
        case "accounticon":
          return (
            <path
              {...props}
              d="M15,14 C18.8662847,14 22,17.1337153 22,21 L22,21 L22,22.7299524 L21.3047757,22.9524241 C20.9355748,23.0705684 20.2938784,23.2312573 19.386873,23.396386 L19.386873,23.396386 L18.8658743,23.4866675 C16.9181395,23.8079433 14.6254626,24 12,24 C9.37453739,24 7.0818605,23.8079433 5.13412573,23.4866675 C3.94847381,23.291096 3.13155266,23.0920492 2.69522427,22.9524241 L2.69522427,22.9524241 L2,22.7299524 L2,21 C2,17.1337153 5.13371525,14 9,14 L9,14 Z M15,16 L9,16 C6.23828475,16 4,18.2382847 4,21 L4,21 L4,21.228 L4.57020219,21.3512636 C4.75277737,21.3879968 4.94542864,21.4243952 5.14810271,21.4601712 L5.14810271,21.4601712 L5.45962427,21.5133325 C7.300952,21.8170567 9.48483761,22 12,22 C14.5151624,22 16.699048,21.8170567 18.5403757,21.5133325 C18.9657429,21.4431689 19.3511253,21.3699409 19.6960969,21.2959486 L19.6960969,21.2959486 L20,21.227 L20,21 C20,18.3109615 17.8779697,16.1181669 15.2169114,16.0046189 L15.2169114,16.0046189 L15,16 Z M12,0 C15.3132847,0 18,2.68671525 18,6 C18,9.4578902 15.2246636,13 12,13 C8.77533638,13 6,9.4578902 6,6 C6,2.68671525 8.68671525,0 12,0 Z M12,2 C9.79128475,2 8,3.79128475 8,6 C8,8.44551607 10.0015055,11 12,11 C13.9984945,11 16,8.44551607 16,6 C16,3.79128475 14.2087153,2 12,2 Z"
            />
          );
        case "dataaccessicon":
          return (
            <path
              {...props}
              d="M17,8.58578644 L21.4142136,13 L12.5112495,21.902964 L6.62563146,23.3743685 L8.09703598,17.4887505 L17,8.58578644 Z M9.5,1 L12.5,5 L24,5 L24,20 C24,21.5976809 22.75108,22.9036609 21.1762728,22.9949073 L21,23 L15,23 L15,21 L21,21 C21.5128358,21 21.9355072,20.6139598 21.9932723,20.1166211 L22,20 L22,7 L11.5,7 L8.5,3 L2,3 L2,20 C2,20.5128358 2.38604019,20.9355072 2.88337887,20.9932723 L3,21 L5,21 L5,23 L3,23 C1.40231912,23 0.0963391206,21.75108 0.00509269341,20.1762728 L0,20 L0,1 L9.5,1 Z M17,11.415 L9.903,18.511 L9.374,20.625 L11.488,20.096 L18.585,13 L17,11.415 Z"
            />
          );
        case "rolesicon":
          return (
            <path
              {...props}
              d="M12,0 C13.6570168,0 15,1.34344712 15,3 L15,3 L15,3.523 L15.2773976,3.62577548 C15.3888367,3.6693432 15.499323,3.71511119 15.6088093,3.76305425 L15.6088093,3.76305425 L15.872,3.884 L16.2428932,3.51489322 C17.3675565,2.3902299 19.1628135,2.34524337 20.3411243,3.37993362 L20.3411243,3.37993362 L20.4851068,3.51489322 C21.6566311,4.68641751 21.6566311,6.58558249 20.4851068,7.75710678 L20.4851068,7.75710678 L20.115,8.127 L20.2369457,8.39119069 C20.2848888,8.50067698 20.3306568,8.61116331 20.3742245,8.72260241 L20.3742245,8.72260241 L20.476,9 L21,9 C22.598096,9 23.9036905,10.2485197 23.9949089,11.8236843 L23.9949089,11.8236843 L24,12 C24,13.6570168 22.6565529,15 21,15 L21,15 L20.476,15 L20.3738837,15.2785815 C20.3302855,15.3901079 20.2844916,15.5006586 20.2365294,15.6101778 L20.2365294,15.6101778 L20.115,15.872 L20.4851068,16.2428932 C21.6097701,17.3675565 21.6547566,19.1628135 20.6200664,20.3411243 L20.6200664,20.3411243 L20.4851068,20.4851068 C19.3135825,21.6566311 17.4144175,21.6566311 16.2428932,20.4851068 L16.2428932,20.4851068 L15.872,20.115 L15.6088093,20.2369457 C15.499323,20.2848888 15.3888367,20.3306568 15.2773976,20.3742245 L15.2773976,20.3742245 L15,20.476 L15,21 C15,22.598096 13.7514803,23.9036905 12.1763157,23.9949089 L12.1763157,23.9949089 L12,24 C10.3429832,24 9,22.6565529 9,21 L9,21 L9,20.476 L8.72141852,20.3738837 C8.60989207,20.3302855 8.49934144,20.2844916 8.38982222,20.2365294 L8.38982222,20.2365294 L8.127,20.115 L7.75710678,20.4851068 C6.63244346,21.6097701 4.83718648,21.6547566 3.65887567,20.6200664 L3.65887567,20.6200664 L3.51489322,20.4851068 C2.34336893,19.3135825 2.34336893,17.4144175 3.51489322,16.2428932 L3.51489322,16.2428932 L3.884,15.872 L3.76305425,15.6088093 C3.71511119,15.499323 3.6693432,15.3888367 3.62577548,15.2773976 L3.62577548,15.2773976 L3.523,15 L3,15 C1.40190399,15 0.0963094688,13.7514803 0.00509110492,12.1763157 L0.00509110492,12.1763157 L0,12 C0,10.3429832 1.34344712,9 3,9 L3,9 L3.523,9 L3.62577548,8.72260241 C3.6693432,8.61116331 3.71511119,8.50067698 3.76305425,8.39119069 L3.76305425,8.39119069 L3.884,8.127 L3.51489322,7.75710678 C2.3902299,6.63244346 2.34524337,4.83718648 3.37993362,3.65887567 L3.37993362,3.65887567 L3.51489322,3.51489322 C4.68641751,2.34336893 6.58558249,2.34336893 7.75710678,3.51489322 L7.75710678,3.51489322 L8.127,3.884 L8.39119069,3.76305425 C8.50067698,3.71511119 8.61116331,3.6693432 8.72260241,3.62577548 L8.72260241,3.62577548 L9,3.523 L9,3 C9,1.40190399 10.2485197,0.0963094688 11.8236843,0.00509110492 L11.8236843,0.00509110492 Z M12,2 C11.4472847,2 11,2.44728475 11,3 L11,3 L11,5.0365983 L10.249998,5.23024634 C9.6143146,5.39437772 9.01052912,5.64485641 8.44990772,5.97541149 L8.44990772,5.97541149 L7.78263628,6.36884984 L6.34289322,4.92910678 C5.95241751,4.53863107 5.31958249,4.53863107 4.92910678,4.92910678 C4.53863107,5.31958249 4.53863107,5.95241751 4.92910678,6.34289322 L4.92910678,6.34289322 L6.36884984,7.78263628 L5.97541149,8.44990772 C5.64485641,9.01052912 5.39437772,9.6143146 5.23024634,10.249998 L5.23024634,10.249998 L5.0365983,11 L3,11 C2.44786203,11 2,11.4477074 2,12 C2,12.5527153 2.44728475,13 3,13 L3,13 L5.0365983,13 L5.23024634,13.750002 C5.39437772,14.3856854 5.64485641,14.9894709 5.97541149,15.5500923 L5.97541149,15.5500923 L6.36884984,16.2173637 L4.92910678,17.6571068 C4.53863107,18.0475825 4.53863107,18.6804175 4.92910678,19.0708932 C5.31958249,19.4613689 5.95241751,19.4613689 6.34289322,19.0708932 L6.34289322,19.0708932 L7.78302599,17.6307604 L8.45050087,18.0249385 C9.00890587,18.3547053 9.61339632,18.6053852 10.249998,18.7697537 L10.249998,18.7697537 L11,18.9634017 L11,21 C11,21.552138 11.4477074,22 12,22 C12.5527153,22 13,21.5527153 13,21 L13,21 L13,18.9634017 L13.750002,18.7697537 C14.3856854,18.6056223 14.9894709,18.3551436 15.5500923,18.0245885 L15.5500923,18.0245885 L16.2173637,17.6311502 L17.6571068,19.0708932 C18.0475825,19.4613689 18.6804175,19.4613689 19.0708932,19.0708932 C19.4613689,18.6804175 19.4613689,18.0475825 19.0708932,17.6571068 L19.0708932,17.6571068 L17.6307604,16.216974 L18.0249385,15.5494991 C18.3547053,14.9910941 18.6053852,14.3866037 18.7697537,13.750002 L18.7697537,13.750002 L18.9634017,13 L21,13 C21.552138,13 22,12.5522926 22,12 C22,11.4472847 21.5527153,11 21,11 L21,11 L18.9634017,11 L18.7697537,10.249998 C18.6056223,9.6143146 18.3551436,9.01052912 18.0245885,8.44990772 L18.0245885,8.44990772 L17.6311502,7.78263628 L19.0708932,6.34289322 C19.4613689,5.95241751 19.4613689,5.31958249 19.0708932,4.92910678 C18.6804175,4.53863107 18.0475825,4.53863107 17.6571068,4.92910678 L17.6571068,4.92910678 L16.2173637,6.36884984 L15.5500923,5.97541149 C14.9894709,5.64485641 14.3856854,5.39437772 13.750002,5.23024634 L13.750002,5.23024634 L13,5.0365983 L13,3 C13,2.44786203 12.5522926,2 12,2 Z M12,8 C14.209139,8 16,9.790861 16,12 C16,14.209139 14.209139,16 12,16 C9.790861,16 8,14.209139 8,12 C8,9.790861 9.790861,8 12,8 Z M12,10 C10.8954305,10 10,10.8954305 10,12 C10,13.1045695 10.8954305,14 12,14 C13.1045695,14 14,13.1045695 14,12 C14,10.8954305 13.1045695,10 12,10 Z"
            />
          );
      case "bell": 
        return (
          <path
            {...props}
            d="M14.855,21.9 C14.4638343,23.1477858 13.307662,23.9969922 12,23.9969922 C10.692338,23.9969922 9.53616569,23.1477858 9.145,21.9 C10.039,21.966 10.989,22 12,22 C13.011,22 13.961,21.966 14.855,21.9 Z M12,1.04308128e-07 C16.418278,1.04308128e-07 20,3.58172208 20,8.0000001 L20,8.0000001 L20,11.0000001 C20,12.1184647 20.3694847,12.8656448 21.2498379,13.8633784 L21.2498379,13.8633784 L21.912636,14.6024334 L22.1063995,14.8323988 C22.6922294,15.552011 23,16.2050716 23,17.0000001 C23,19.5180132 18.8479819,20.8957103 12.7161782,20.9943078 L12.7161782,20.9943078 L12,21.0000001 C5.47754614,21.0000001 1,19.6148599 1,17.0000001 C1,16.2050716 1.30777056,15.552011 1.89360048,14.8323988 C2.01589935,14.6821714 2.1439002,14.5355169 2.3259129,14.3340038 L2.3259129,14.3340038 L2.61844503,14.011047 L2.91946309,13.6669881 C3.67813779,12.7643706 4,12.0439004 4,11.0000001 L4,11.0000001 L4,8.0000001 C4,3.58172208 7.58172201,1.04308128e-07 12,1.04308128e-07 Z M12,2.0000001 C8.6862915,2.0000001 6,4.68629158 6,8.0000001 L6,8.0000001 L6,11.0000001 C6,12.6898688 5.4226097,13.8574802 4.24983786,15.1866217 C4.20896668,15.2306256 3.58542908,15.9221052 3.44461991,16.0950701 L3.44461991,16.0950701 L3.34441885,16.2222363 C3.09644422,16.5487301 3,16.7780382 3,17.0000001 C3,17.8786654 6.62477967,19.0000001 12,19.0000001 C17.3752203,19.0000001 21,17.8786654 21,17.0000001 C21,16.750293 20.8779378,16.4912882 20.5553801,16.0950701 C20.5117963,16.0415334 20.4219647,15.9383203 20.3174653,15.8199853 L20.3174653,15.8199853 L19.7501621,15.1866217 C18.5773903,13.8574802 18,12.6898688 18,11.0000001 L18,11.0000001 L18,8.0000001 C18,4.68629158 15.3137085,2.0000001 12,2.0000001 Z"
          />
        ); 
      case "newestprojecticon": 
        return (
           <path
            {...props}
            d="M12,0 C14.7614237,0 17,2.23857625 17,5 C17,7.41853874 15.2828356,9.43601224 13.0011864,9.89974091 L13,12.495 L16.2001785,14.8568121 C16.9430625,14.3538145 17.8284249,14.0453652 18.7831104,14.0046195 L19,14 C21.7614237,14 24,16.2385763 24,19 C24,21.7614237 21.7614237,24 19,24 C16.2385763,24 14,21.7614237 14,19 C14,18.006293 14.2898828,17.0802918 14.7896973,16.3019475 L12,14.242 L9.21030272,16.3019475 C9.67356615,17.0233721 9.95647949,17.8716471 9.99538049,18.7831104 L10,19 C10,21.7614237 7.76142375,24 5,24 C2.23857625,24 0,21.7614237 0,19 C0,16.2385763 2.23857625,14 5,14 C6.03738327,14 7.00097825,14.3159252 7.79982145,14.8568121 L11,12.495 L10.999812,9.89994372 C8.71766536,9.43660076 7,7.4188915 7,5 C7,2.23857625 9.23857625,0 12,0 Z M5,16 C3.34314575,16 2,17.3431458 2,19 C2,20.6568542 3.34314575,22 5,22 C6.65685425,22 8,20.6568542 8,19 C8,17.3431458 6.65685425,16 5,16 Z M19,16 C17.3431458,16 16,17.3431458 16,19 C16,20.6568542 17.3431458,22 19,22 C20.6568542,22 22,20.6568542 22,19 C22,17.3431458 20.6568542,16 19,16 Z M12,2 C10.3431458,2 9,3.34314575 9,5 C9,6.65685425 10.3431458,8 12,8 C13.6568542,8 15,6.65685425 15,5 C15,3.34314575 13.6568542,2 12,2 Z"
          />
        );
      case "personicon":
          return (
            <path
             {...props} 
             d="M16.3527273,17.3775 C15.0133636,16.9166667 14.3252727,15.9108333 13.9759091,15.1 C15.9051818,13.9216667 16.9090909,11.125 16.9090909,9 C16.9090909,6.23833333 14.7114545,4 12,4 C9.28854545,4 7.09090909,6.23833333 7.09090909,9 C7.09090909,11.1266667 8.09563636,13.925 10.0273636,15.1016667 C9.67963636,15.9191667 8.99318182,16.9325 7.65709091,17.3741667 C5.30072727,18.1516667 3,18.4058333 3,22.3333333 L3,24 L21,24 L21,22.3333333 C21,18.4641667 18.8015455,18.22 16.3527273,17.3775 Z"
           />
         );
      case "closeicon":
        return (
          <path
            {...props}
            d="M19 3.58578644 20.4142136 5 13.415 12 20.4142136 19 19 20.4142136 12 13.415 5 20.4142136 3.58578644 19 10.585 12 3.58578644 5 5 3.58578644 12 10.585z"
          />
        );
      case "collections":
        return (
          <path
            {...props}
            d="M16.6808511,23.9787234 C16.387828,23.9890585 16.1039977,23.8755264 15.8989362,23.6659574 L8.86170213,16.1595745 L1.82446809,23.6659574 C1.53293111,23.997315 1.06433233,24.1091948 0.654547253,23.9452808 C0.244762175,23.7813668 -0.0174094455,23.3771788 6.31544621e-13,22.9361702 L6.31544621e-13,1.04255319 C6.31544621e-13,0.466766963 0.466766963,0 1.04255319,0 L16.6808511,0 C17.2566373,0 17.723496,0.466766963 17.723496,1.04255319 L17.723496,22.9361702 C17.7292217,23.3762564 17.4580456,23.7725906 17.0457447,23.9265957 L16.6808511,23.9265957 L16.6808511,23.9787234 Z M8.86170213,13.6053191 C9.15472523,13.5949841 9.43855551,13.7085162 9.64361702,13.9180851 L15.6382979,20.3297872 L15.6382979,2.08510638 L2.08510638,2.08510638 L2.08510638,20.3297872 L8.07978723,13.9702128 C8.27549939,13.7413696 8.56059843,13.6083233 8.86170213,13.6053191 Z"
          />
        );
      case "chevronbottom":
        return (
          <path
            {...props}
            d="M12.41,16.41 C12.178,16.41 11.947,16.33 11.759,16.169 L4,9.519 L5.302,8 L12.41,14.093 L19.518,8 L20.82,9.519 L13.061,16.169 C12.873,16.33 12.642,16.41 12.41,16.41 Z"
          />
        );
        case "chevronright":
          return (
            <path
              {...props}
              d="M10.108 20.41L8.59 19.108 14.683 12 8.59 4.892l1.518-1.302 6.651 7.76c.321.374.321.927 0 1.301l-6.651 7.759z"
            />
          );
      case "dashboard":
        return (
          <path
            {...props}
            d="M2.74074074,1 C3.25357658,1 3.6762479,1.38604019 3.73401301,1.88337887 L3.74074074,2 L3.74074074,21.43 L22,21.4300315 C22.5522847,21.4300315 23,21.8777468 23,22.4300315 C23,22.9428674 22.6139598,23.3655387 22.1166211,23.4233038 L22,23.4300315 L2.74074074,23.4300315 C2.18845599,23.4300315 1.74074074,22.9823163 1.74074074,22.4300315 L1.74074074,2 C1.74074074,1.44771525 2.18845599,1 2.74074074,1 Z M12.3703704,4.14308177 C12.8832062,4.14308177 13.3058775,4.52912196 13.3636426,5.02646065 L13.3703704,5.14308177 L13.3703704,19.2869497 C13.3703704,19.8392345 12.9226551,20.2869497 12.3703704,20.2869497 C11.8575345,20.2869497 11.4348632,19.9009096 11.3770981,19.4035709 L11.3703704,19.2869497 L11.3703704,5.14308177 C11.3703704,4.59079702 11.8180856,4.14308177 12.3703704,4.14308177 Z M16.8148148,7.28616354 C17.3276507,7.28616354 17.750322,7.67220373 17.8080871,8.16954242 L17.8148148,8.28616354 L17.8148148,19.2869497 C17.8148148,19.8392345 17.3670996,20.2869497 16.8148148,20.2869497 C16.301979,20.2869497 15.8793077,19.9009096 15.8215425,19.4035709 L15.8148148,19.2869497 L15.8148148,8.28616354 C15.8148148,7.73387879 16.2625301,7.28616354 16.8148148,7.28616354 Z M7.92592593,11.2150158 C8.43876177,11.2150158 8.86143309,11.6010559 8.91919819,12.0983946 L8.92592593,12.2150158 L8.92592593,19.2869497 C8.92592593,19.8392345 8.47821068,20.2869497 7.92592593,20.2869497 C7.41309009,20.2869497 6.99041877,19.9009096 6.93265366,19.4035709 L6.92592593,19.2869497 L6.92592593,12.2150158 C6.92592593,11.662731 7.37364118,11.2150158 7.92592593,11.2150158 Z"
          />
        );
      case "info":
        return (
          <path
            {...props}
            d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z M12,2 C6.4771525,2 2,6.4771525 2,12 C2,17.5228475 6.4771525,22 12,22 C17.5228475,22 22,17.5228475 22,12 C22,6.4771525 17.5228475,2 12,2 Z M12,17 C12.5522847,17 13,17.4477153 13,18 C13,18.5522847 12.5522847,19 12,19 C11.4477153,19 11,18.5522847 11,18 C11,17.4477153 11.4477153,17 12,17 Z M16.1206874,6.67932807 C17.2209199,8.45981868 16.6379252,10.5411221 14.8741206,12.1384592 L14.3264329,12.6130934 C13.3239342,13.4945028 13.030424,13.9263637 13.0023052,14.4175067 L13,14.5 L13,15.5 L11,15.5 L11,14.5 C11,13.1575019 11.6219948,12.2779887 13.3945335,10.7760576 C14.6203376,9.73739295 14.9648001,8.61342658 14.4193126,7.73067193 C13.9279593,6.93552185 12.1100643,6.73606478 10.4549463,7.39185066 L10.2572088,7.47466675 L9.34254204,7.87887553 L8.53412447,6.04954204 L9.44879121,5.64533325 C11.9582508,4.53635489 14.9712365,4.81918811 16.1206874,6.67932807 Z"
          />
        );
      case "infofill":
        return (
          <path
            {...props}
            d="M12,0 C18.627417,0 24,5.372583 24,12 C24,18.627417 18.627417,24 12,24 C5.372583,24 0,18.627417 0,12 C0,5.372583 5.372583,0 12,0 Z M12,17 C11.4477153,17 11,17.4477153 11,18 C11,18.5522847 11.4477153,19 12,19 C12.5522847,19 13,18.5522847 13,18 C13,17.4477153 12.5522847,17 12,17 Z M16.1206874,6.67932807 C14.9712365,4.81918811 11.9582508,4.53635489 9.44879121,5.64533325 L9.44879121,5.64533325 L8.53412447,6.04954204 L9.34254204,7.87887553 L10.2572088,7.47466675 L10.4549463,7.39185066 C12.1100643,6.73606478 13.9279593,6.93552185 14.4193126,7.73067193 C14.9648001,8.61342658 14.6203376,9.73739295 13.3945335,10.7760576 C11.6219948,12.2779887 11,13.1575019 11,14.5 L11,14.5 L11,15.5 L13,15.5 L13,14.5 L13.0023052,14.4175067 C13.030424,13.9263637 13.3239342,13.4945028 14.3264329,12.6130934 L14.3264329,12.6130934 L14.8741206,12.1384592 C16.6379252,10.5411221 17.2209199,8.45981868 16.1206874,6.67932807 Z"
          />
        );
        case "chat":
          return (
            <path
              {...props}
              d="M11,3.55271368e-15 C17.0322075,3.55271368e-15 22,3.97437127 22,9 C22,9.19397164 21.9925995,9.38637722 21.978023,9.5770487 C23.2665679,10.8047361 24,12.3485987 24,14 C24,15.6083904 23.3046663,17.1157926 22.0770935,18.3283051 L22,18.401 L22,23.618034 L16.548,20.892 L16.4107223,20.9122125 C16.0984947,20.9509307 15.7853656,20.9770413 15.4714497,20.9901463 L15,21 C11.9432595,21 9.14537734,19.8087021 7.49814363,17.8692765 L2,20.6178843 L2,14.166 L1.83136272,13.9656728 C0.719807753,12.595729 0.0783463698,10.998817 0.00672653571,9.31641722 L0.00672653571,9.31641722 L0,9 C0,3.97437127 4.96779252,3.55271368e-15 11,3.55271368e-15 Z M21.3888309,11.9782266 L21.3400716,12.0888747 C19.7973215,15.5612816 15.7252292,18 11,18 C10.9409172,18 10.8818789,17.9996057 10.8228884,17.9988186 C11.9977015,18.6306581 13.4483029,19 15,19 C15.3890899,19 15.77771,18.9754346 16.1657644,18.9272683 L16.5536268,18.8712706 L16.8733754,18.8186537 L20,20.382 L20,17.4981693 L20.3515862,17.1987119 C21.4205016,16.288282 22,15.166042 22,14 C22,13.2980698 21.7896042,12.6118743 21.3888309,11.9782266 Z M11,2 C5.98655285,2 2,5.18935243 2,9 C2,10.4812988 2.60688048,11.9020612 3.72996335,13.1015137 L3.72996335,13.1015137 L4,13.3899129 L4,17.381 L7.7248605,15.5200708 L8.09102488,15.6178617 C9.03279428,15.8693785 10.0089942,16 11,16 C16.0134472,16 20,12.8106476 20,9 C20,5.18935243 16.0134472,2 11,2 Z"
            />
          );
        case "check":
          return (
            <path
              {...props}
              d="M9.988 17c-.265 0-.52-.105-.707-.292l-3-3c-.38-.393-.374-1.016.012-1.402.386-.386 1.01-.391 1.402-.012l2.2 2.2 6.303-8.107c.339-.437.967-.516 1.404-.176.436.339.515.967.176 1.404l-7 9c-.176.227-.441.368-.728.386h-.062z"
            />
          );
        case "workflow":
          return (
            <path
              {...props}
              d="M7.362 6.394L0 13.72l7.362 7.326 7.362-7.326-7.362-7.326zM3.207 13.72l4.15-4.129 4.154 4.129-4.15 4.129-4.154-4.13zm17.8-7.077c-1.998-1.983-4.609-2.977-7.225-2.977V0l-4.82 4.795 4.82 4.79v-3.66c2.032 0 4.07.774 5.619 2.316 3.105 3.09 3.105 8.094 0 11.184-1.55 1.542-3.587 2.316-5.62 2.316-1.1 0-2.196-.232-3.218-.684L8.872 22.74c1.521.836 3.212 1.26 4.91 1.26 2.616 0 5.227-.994 7.225-2.977 3.99-3.97 3.99-10.41 0-14.38z"
              />
          );
        case "attention":
          return (
            <path
              {...props}
              d="M8,0 C3.6,0 0,3.6 0,8 C0,12.4 3.6,16 8,16 C12.4,16 16,12.4 16,8 C16,3.6 12.4,0 8,0 Z M8,12 C7.4,12 7,11.6 7,11 C7,10.4 7.4,10 8,10 C8.6,10 9,10.4 9,11 C9,11.6 8.6,12 8,12 Z M9,9 L7,9 L7,4 L9,4 L9,9 Z"
            />
          );
        case "eye":
          return (
            <path
              {...props}
              d="M12 4c2.934 0 5.6 1.435 7.957 3.793.808.807 1.522 1.67 2.138 2.532.28.391.495.72.645.964l.128.215.284.496-.284.496c-.105.185-.278.462-.515.81l-.258.369c-.616.863-1.33 1.725-2.138 2.532C17.6 18.565 14.934 20 12 20s-5.6-1.435-7.957-3.793c-.808-.807-1.522-1.67-2.138-2.532-.372-.521-.632-.932-.773-1.179L.848 12l.284-.496c.105-.185.278-.462.515-.81l.258-.369c.616-.863 1.33-1.725 2.138-2.532C6.4 5.435 9.066 4 12 4zm0 2C9.684 6 7.475 7.19 5.457 9.207c-.724.724-1.369 1.502-1.925 2.28-.096.136-.187.267-.271.392L3.179 12l.082.121.271.392c.556.778 1.201 1.556 1.925 2.28C7.475 16.81 9.684 18 12 18s4.525-1.19 6.543-3.207c.724-.724 1.369-1.502 1.925-2.28.096-.136.187-.267.271-.392L20.82 12l-.081-.121-.271-.392c-.556-.778-1.201-1.556-1.925-2.28C16.525 7.19 14.316 6 12 6zm0 2c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"
            />
          );
        case "eyeCrossed":
          return (
            <path
              {...props}
              d="M21 1.586L22.414 3l-3.679 3.679c.416.343.824.715 1.222 1.114.808.807 1.522 1.67 2.138 2.532.28.391.495.72.645.964l.128.215.284.496-.284.496c-.105.185-.278.462-.515.81l-.258.369c-.616.863-1.33 1.725-2.138 2.532C17.6 18.565 14.934 20 12 20c-1.799 0-3.496-.54-5.084-1.5L3 22.414 1.586 21l3.68-3.678c-.417-.344-.824-.716-1.223-1.115-.808-.807-1.522-1.67-2.138-2.532-.372-.521-.632-.932-.773-1.179L.848 12l.284-.496c.105-.185.278-.462.515-.81l.258-.369c.616-.863 1.33-1.725 2.138-2.532C6.4 5.435 9.066 4 12 4c1.799 0 3.497.54 5.085 1.5L21 1.587zM17.313 8.1l-1.867 1.867c.352.595.554 1.29.554 2.032 0 2.21-1.79 4-4 4-.742 0-1.437-.202-2.032-.554l-1.585 1.585C9.549 17.66 10.759 18 12 18c2.316 0 4.525-1.19 6.543-3.207.724-.724 1.369-1.502 1.925-2.28.096-.136.187-.267.271-.392L20.82 12l-.081-.121-.271-.392c-.556-.778-1.201-1.556-1.925-2.28-.403-.402-.813-.772-1.23-1.106zM12 6C9.684 6 7.475 7.19 5.457 9.207c-.724.724-1.369 1.502-1.925 2.28-.096.136-.187.267-.271.392L3.179 12l.082.121.271.392c.556.778 1.201 1.556 1.925 2.28.403.403.813.773 1.23 1.107l1.867-1.868C8.202 13.437 8 12.742 8 12c0-2.21 1.79-4 4-4 .742 0 1.437.202 2.032.554l1.585-1.585C14.451 6.34 13.241 6 12 6zm1.932 5.482l-2.45 2.45c.165.044.339.068.518.068 1.105 0 2-.895 2-2 0-.18-.024-.353-.068-.518zM12 10c-1.105 0-2 .895-2 2 0 .18.024.353.068.518l2.45-2.45C12.353 10.024 12.179 10 12 10z"
            />
          );
<<<<<<< HEAD
        case "educationicon": 
          return (
            <path
              {...props}
              d="M12.168.142c.534-.192 1.12-.19 1.651.01l10.506 3.914c1.243.463 1.874 1.845 1.411 3.087-.281.755-.923 1.319-1.708 1.5l-2.527.584v3.293c0 1.071-.709 2.005-1.724 2.303l-.163.041-1.614.353v.809l.731.857c1.211 1.457 1.73 2.564 1.173 3.84l-.079.168c-1.006 1.996-4.6 1.958-5.577-.013-.63-1.272-.205-2.318.945-3.775l.317-.39.49-.593v-.465l-2.495.547c-.272.06-.553.071-.828.035l-.205-.036-6.016-1.335c-1.098-.243-1.88-1.218-1.88-2.343V9.224L1.82 8.54C.59 8.233-.182 7.025.037 5.792l.034-.16c.194-.778.762-1.408 1.516-1.68zM17.048 18c-.834 1.006-1.17 1.672-1.008 2 .243.491 1.734.527 2 0 .177-.352-.153-1.018-.992-2zm-3.99-11.765c-2.128 0-4.285.82-6.481 2.494l-.001 3.804c0 .188.13.35.313.39l6.016 1.335c.057.013.115.013.172 0l2.923-.64V6.755c-.987-.348-1.968-.52-2.942-.52zM18 7.692v5.488l1.186-.26c.158-.034.276-.158.307-.311l.008-.079V8.7c-.503-.38-1.003-.716-1.5-1.008zm0-3.849v1.584c.996.482 1.985 1.109 2.968 1.88l2.61-.602c.13-.03.237-.125.284-.25.077-.207-.028-.438-.235-.515L18 3.843zm-4.88-1.818c-.088-.033-.185-.033-.274-.001L2.265 5.834c-.126.045-.22.15-.253.28-.053.214.078.431.292.485l2.845.706c2.597-2.035 5.238-3.07 7.909-3.07.985 0 1.966.14 2.942.42V3.099z"
            />
          );
=======
        case "members":
          return (
            <path
              {...props}
              d="M4 2l-.186.006C2.215 2.123 1 3.426 1 5l.006.186C1.123 6.785 2.426 8 4 8l.186-.006C5.785 7.877 7 6.574 7 5l-.006-.186C6.877 3.215 5.574 2 4 2zm-.076 2.003L4 4c.525 0 .959.405.997.924l.004.113c-.001.488-.406.922-.925.96l-.113.004c-.488-.001-.922-.406-.96-.925l-.004-.113c.001-.488.406-.922.925-.96zM5 9v2H3c-.513 0-.936.386-.993.883L2 12v4h2v4h3v2H2v-4H0v-6c0-1.598 1.249-2.904 2.824-2.995L3 9h2zM20.223 2.008L20 2c-1.574 0-2.877 1.215-2.992 2.777l-.007.186C17 6.574 18.215 7.877 19.777 7.992l.186.007c1.611.001 2.914-1.214 3.029-2.776l.007-.186c.001-1.611-1.214-2.914-2.776-3.029zm-.342 1.999L19.997 4l.116.005c.482.036.887.47.887.995l-.005.113C20.96 5.595 20.525 6 20 6l-.113-.005C19.405 5.96 19 5.525 19 5l.005-.113c.033-.445.406-.824.876-.88zM21 9c1.598 0 2.904 1.249 2.995 2.824L24 12v6h-2v4h-5v-2h3v-4h2v-4c0-.513-.386-.936-.883-.993L21 11h-2V9h2zM12 0l-.205.006C9.656.129 8 1.878 8 4l.006.205C8.129 6.344 9.878 8 12 8l.205-.006C14.344 7.871 16 6.122 16 4l-.006-.205C15.871 1.656 14.122 0 12 0zm-.118 2.003L12 2c1.06 0 1.936.828 1.997 1.882l.003.147c0 1.032-.828 1.907-1.882 1.968L11.971 6c-1.032 0-1.907-.828-1.968-1.882L10 3.971c0-1.032.828-1.907 1.882-1.968z"
              d="M15 9H9c-1.657 0-3 1.343-3 3v6h2v6h8v-5h2v-7c0-1.657-1.343-3-3-3zm0 2l.117.007c.497.057.883.48.883.993v5h-2v5h-4v-6H8v-4c0-.553.447-1 1-1h6z"
            />
          );
          
>>>>>>> Frontend for adding team members
    default:
      return <path />;
  }
};

const SVGIcon = ({
  name = "",
  style = {},
  fill = "#000",
  viewBox = "",
  width = "100%",
  className = "",
  height = "100%"
}) => (
    <svg
      width={width}
      style={style}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox || getViewBox(name)}
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {getPath(name, { fill })}
    </svg>
  );
 
export default SVGIcon;