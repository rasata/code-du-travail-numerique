import * as React from "react";

function SvgShade(props) {
  return (
    <svg
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 807 518"
      aria-hidden="true"
      {...props}
    >
      <path
        opacity={0.1}
        d="M415.361 95.407c-50.735 8.262-101.548 3.815-150.464-2.345s-97.718-14.026-148.56-12.486c-32.686.999-69.046 7.27-91.664 26.513C2.915 125.603-.197 150.915.01 173.807c.157 17.217 1.812 35.052 13.757 48.897 8.292 9.608 20.969 16.586 30.555 25.472 33.397 30.925 23.925 78.83 2.778 119.397-9.948 19.034-22.106 37.715-28.778 57.229-6.673 19.513-7.334 40.531 5.23 56.687 12.463 16.017 36.303 25.243 61.109 30.189 50.372 10.038 106.28 4.856 160.355-2.351 119.689-16.031 238.042-41.961 356.055-67.842 43.679-9.573 87.549-19.201 129.573-33.297 23.335-7.811 47.075-17.64 62.019-33.186 18.965-19.735 19.135-46.976.398-63.499-31.436-27.748-101.762-22.531-126.198-54.108-13.459-17.342-7.98-40.663 2.302-61.161 22.028-43.98 65.195-87.162 58.977-131.356-4.263-30.355-34.377-55.772-74.382-62.799-41.924-7.36-95.509 4.932-119.22 35.114-24.416 31.16-74.383 50.93-119.178 58.214z"
        fill="currentColor"
      />
    </svg>
  );
}

const MemoSvgShade = React.memo(SvgShade);
export default MemoSvgShade;
