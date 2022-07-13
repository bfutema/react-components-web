import styled from 'styled-components';

export const Container = styled.div`
  width: 300px;
`;

export const Group = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  input {
    width: 100%;

    border-radius: 4px;
    border: 1px solid #215164;
    outline: none;
    background: #112d37;

    color: #fff;
    font-size: 16px;

    padding: 15px 3rem 15px 15px;

    transition: width 0.9s, height 0.9s, border-radius 0.9s;

    &::placeholder {
      color: #346a80;
    }

    &:focus {
      border: 1px solid #55b7dd;
      box-shadow: 0px 0px 2px 2px #55b7dd34;
    }
  }

  .toggle {
    font-size: 25px;

    position: absolute;
    right: 10px;

    user-select: none;

    cursor: pointer;

    z-index: 99;
  }

  .ripple {
    width: 35px;
    height: 35px;

    border-radius: 50%;
    background: #fff;

    position: absolute;
    right: 10px;

    display: block;

    transition: all 0.2s;

    z-index: 1;
  }
`;

export const PassStrength = styled.div`
  margin-top: 3px;

  display: flex;
  align-items: center;
`;

export const StrengthPercent = styled.div`
  height: 5px;

  border-radius: 10px;
  background: #eee;

  flex: 1;
  display: block;

  span {
    height: 100%;

    border-radius: 10px;

    display: block;

    transition: all 0.4s;

    &.weak {
      width: 33%;

      background: red;
    }

    &.average {
      width: 66%;

      background: #ffd000;
    }

    &.strong {
      width: 100%;

      background: green;
    }
  }
`;

export const StrengthLabel = styled.div`
  font-size: 12px;
  margin-left: 10px;
`;
