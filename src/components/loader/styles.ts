import styled from '@emotion/styled';

export const Container = styled.div`
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  position: fixed;
  overflow: hidden;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    96.87deg,
    rgba(0, 0, 0, 0) 5.47%,
    rgba(0, 0, 0, 0.5) 103.84%
  ) !important;
  backdrop-filter: blur(3px) !important;
`;
