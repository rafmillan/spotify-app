import styled from "styled-components";

export const Div = styled.div`
  display: flex;

  svg {
    overflow: inherit;
  }
  .recharts-surface,
  .recharts-responsive-container,
  .recharts-wrapper {
    @media (max-width: 990px) {
      height: 400px !important;
      min-height: 400px !important;
    }
    @media (max-width: 767px) {
      height: 300px !important;
      min-height: 300px !important;
    }
  }
  g.recharts-layer.recharts-polar-angle-axis > g > g:nth-child(1) > text {
    transform: translateY(-10px);
  }
  g.recharts-layer.recharts-polar-angle-axis > g > g:nth-child(2) > text,
  g.recharts-layer.recharts-polar-angle-axis > g > g:nth-child(3) > text {
    transform: translateX(10px);
  }
  g.recharts-layer.recharts-polar-angle-axis > g > g:nth-child(4) > text {
    transform: translateY(20px);
  }
  g.recharts-layer.recharts-polar-angle-axis > g > g:nth-child(5) > text,
  g.recharts-layer.recharts-polar-angle-axis > g > g:nth-child(6) > text {
    transform: translateX(-10px);
  }

  g.recharts-layer.recharts-polar-angle-axis text {
    font-weight: 400;
    font-family: "Quicksand", sans-serif;
    font-size: 23px;
    @media (max-width: 990px) {
      font-size: 20px;
    }
    @media (max-width: 767px) {
      font-size: 16px;
    }
    @media (max-width: 575px) {
      font-size: 13px;
    }
  }
`;
