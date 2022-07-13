import React, { useRef, useCallback } from 'react';

import {
  Container,
  Group,
  PassStrength,
  StrengthPercent,
  StrengthLabel,
} from './styles';

const InputPassword: React.FC = () => {
  const passInputRef = useRef<HTMLInputElement>(null);
  const passLabelRef = useRef<HTMLDivElement>(null);
  const percentBarRef = useRef<HTMLDivElement>(null);
  const strengthPercentRef = useRef<HTMLDivElement>(null);
  const toggleIconRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  const addClass = useCallback((className?: string) => {
    if (percentBarRef.current) {
      percentBarRef.current.classList.remove('weak');
      percentBarRef.current.classList.remove('average');
      percentBarRef.current.classList.remove('strong');

      if (className) {
        percentBarRef.current.classList.add(className);
      }
    }
  }, []);

  const togglePassInput = useCallback(() => {
    if (passInputRef.current) {
      const type = passInputRef.current.getAttribute('type');

      if (type === 'password') {
        passInputRef.current.setAttribute('type', 'text');
        if (toggleIconRef.current) toggleIconRef.current.innerHTML = '💀';
        if (rippleRef.current)
          rippleRef.current.style.cssText = `
          border-radius: 4px;
          width: 100%;
          height: 100%;
          right: 0;
          z-index:-1;
        `;
        passInputRef.current.style.color = '#000';
        passInputRef.current.style.background = 'transparent';
        if (toggleIconRef.current)
          toggleIconRef.current.style.fontSize = '27px';
      } else {
        passInputRef.current.setAttribute('type', 'password');
        if (toggleIconRef.current) toggleIconRef.current.innerHTML = '☠️';
        if (toggleIconRef.current)
          toggleIconRef.current.style.fontSize = '25px';
        if (rippleRef.current)
          rippleRef.current.style.cssText = `
          border-radius: 50%;
          height: 35px;
          width: 35px;
          right: 10px;
          z-index: 1;
        `;
        passInputRef.current.style.color = '#fff';
        passInputRef.current.style.background = '#112d37';
      }
    }
  }, []);

  const onInput = useCallback(() => {
    if (passInputRef.current) {
      if (passInputRef.current.value.length === 0) {
        if (passLabelRef.current) passLabelRef.current.innerHTML = 'Strength';

        addClass();
      } else if (passInputRef.current.value.length <= 4) {
        if (passLabelRef.current) passLabelRef.current.innerHTML = 'Weak';

        addClass('weak');
      } else if (passInputRef.current.value.length <= 7) {
        if (passLabelRef.current) passLabelRef.current.innerHTML = 'Not Bad';

        addClass('average');
      } else {
        if (passLabelRef.current) passLabelRef.current.innerHTML = 'Strong';

        addClass('strong');
      }
    }
  }, [addClass]);

  return (
    <Container>
      <Group>
        <input
          ref={passInputRef}
          type="password"
          placeholder="Enter your password"
          onInput={onInput}
        />
        <span ref={toggleIconRef} className="toggle" onClick={togglePassInput}>
          ☠️
        </span>
        <span ref={rippleRef} className="ripple" />
      </Group>

      <PassStrength>
        <StrengthPercent ref={strengthPercentRef}>
          <span ref={percentBarRef} />
        </StrengthPercent>

        <StrengthLabel ref={passLabelRef}>Strength</StrengthLabel>
      </PassStrength>
    </Container>
  );
};

export { InputPassword };
