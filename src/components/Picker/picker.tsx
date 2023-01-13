import React, { useState, useEffect, useCallback, forwardRef, useRef, Ref } from "react";

/**
 *
 * <Picker>
 * <PickerSelect value="0" onChange>
 *   <PickerOption value="0">Nazwa</PickerOption>
 * </PickerSelect/>
 * </Picker>
 *
 */

const PickerOption = forwardRef(function PickerOption(
  props: {
    children: React.ReactNode;
  },
  ref: Ref<HTMLDivElement>
) {
  const { children } = props;

  return (
    <div
      className='text-sm text-zinc-600 height-[32px] leading-[32px] select-none'
      ref={ref}>
      <div className='flex flex-row flex-nowrap justify-center'>{children}</div>
    </div>
  );
});

const PickerSelect = forwardRef(function PickerSelect(
  props: {
    children: React.ReactNode;
    onChange: any;
    value: any;
  },
  ref: Ref<HTMLDivElement>
) {
  const { children, onChange: onChangeCallback, value: defaultValue = 0 } = props;

  const [move, setMove] = useState<boolean>(false);
  const [moving, setMoving] = useState<Array<number>>([0, 0]);
  const [translate, setTranslate] = useState<number>(0);
  const [value, setValue] = useState<number>(defaultValue);

  const inputRef = useRef<HTMLInputElement>(null);
  const numbersBackground = useRef<HTMLDivElement>(null);

  const childrenArr = !Array.isArray(children) || children.length <= 0 ? [] : children;

  const handle_mouseEnter = (e: any) => {
    setMove(true);
    if (numbersBackground.current !== null) {
      numbersBackground.current.style.transitionDuration = "0s";
    }
  };

  const handle_mouseMove = (e: any) => {
    if (e.type !== "touchmove" && e.buttons !== 1) {
      setMove(false);
      setMoving([0, 0]);
      if (translate >= 6) setTranslate(6);
      return;
    }

    if (inputRef.current !== null) inputRef.current.focus();

    const consumer = e.type === "touchmove" ? e.touches[0] : e;

    setMoving((state) => {
      const currScreenY = consumer.screenY;
      if (state[1] === 0) return [0, currScreenY];

      let calculateMove = state[1] - currScreenY;
      let currMovingY = state[0] + calculateMove;

      //   if (currMovingY < 0) setDirY(true);
      //   if (currMovingY >= 0) setDirY(false);

      return [currMovingY, currScreenY];
    });
  };

  const handle_mouseLeave = (e: any) => {
    if (moving[0] >= 10 || moving[0] <= -10) {
      //let multiplicatorY = Math.abs(Math.floor(moving[0] / 32));
      let multiplicatorY = Math.round(moving[0] / 32);

      //if (moving[0] < 6 && moving[0] > 0)
      setTranslate((state) => {
        let val = state + multiplicatorY;

        // if (!dirY) value = state + multiplicatorY;
        // if (dirY) value = state - multiplicatorY;

        if (val <= 0) val = 0;
        if (val >= 6) val = 6;

        if (val !== state) setValue(val);

        return val;
      });
    } //

    setMove(false);
    setMoving([0, 0]);

    if (numbersBackground.current !== null) {
      numbersBackground.current.style.transitionDuration = "1.5s";
    }
  };

  useEffect(() => {
    if (numbersBackground.current === null) return;
    //console.log(move, moving);
    //numbersBackground.current.style.transform = `translateY(-${moving[0]}px)`;

    if (move) {
      numbersBackground.current.style.transform = `translateY(-${32 * translate + moving[0]}px)`;

      return;
    }

    // console.log(translate);
    numbersBackground.current.style.transform = `translateY(-${32 * translate}px)`;

    if (onChangeCallback) {
      onChangeCallback(inputRef);
    }
  }, [moving[0], translate]);

  const handleOptionClick = (child: any) => (event: any) => {
    let val = child.props.value;
    setTranslate(val);
    setValue(val);
    console.log("click item");
  };
  const handleChange = (event: any) => {
    console.log("abc");
    // if (onChangeCallback) {
    //   onChangeCallback(event);
    // }
  };

  const items = childrenArr.map((child: React.ReactNode, index: number, arr: any) => {
    if (!React.isValidElement(child)) return;

    let selected = String(value) === String(child.props.value);

    return React.cloneElement<any>(child, {
      key: `picker-select-option-${index}`,
      "aria-selected": selected ? true : false,
      "data-value": child.props.value,
      role: "option",
      value: undefined,
      onClick: handleOptionClick(child),
    });
  });

  useEffect(() => {
    //console.log(items);
  }, []);

  return (
    <div
      ref={ref}
      className='w-full relative select-none'
      onTouchEnd={handleChange}
      onTouchCancel={handleChange}>
      <div className={`overflow-hidden h-[160px] px-3`}>
        <div
          className='pt-[64px] w-full'
          ref={numbersBackground}
          style={{
            transitionProperty: "transform 0.3s ease",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease",
          }}>
          {items}
        </div>
      </div>
      <input
        ref={inputRef}
        id='picker-select'
        type='hidden'
        name='picker-select-form-control-input'
        value={value}
        onChange={() => console.log("abc")}
      />
      <div
        className='w-full h-full absolute left-0 top-0 touch-pan-x'
        ///
        onMouseDown={(e) => handle_mouseEnter(e)}
        onMouseMove={(e) => handle_mouseMove(e)}
        onMouseUp={(e) => handle_mouseLeave(e)}
        onMouseLeave={(e) => handle_mouseLeave(e)}
        ////
        onTouchStartCapture={(e) => handle_mouseEnter(e)}
        onTouchStart={(e) => handle_mouseEnter(e)}
        onTouchMove={(e) => handle_mouseMove(e)}
        onTouchCancel={(e) => handle_mouseLeave(e)}
        onTouchEnd={(e) => handle_mouseLeave(e)}></div>
    </div>
  );
});

const Picker = forwardRef(function Picker(
  props: {
    children: React.ReactNode;
  },
  ref: Ref<HTMLDivElement>
) {
  const { children } = props;
  const numbersMain = useRef(null);

  return (
    <div ref={ref}>
      <div
        ref={numbersMain}
        className='relative py-12 mb-32'>
        <div className='relative z-10 h-full'>
          <div className='w-full h-auto absolute left-0 top-[50%]'>
            <div
              className='w-full py-4 px-3 rounded-lg bg-zinc-800 h-[32px]'
              style={{
                transform: "translateY(-50%)",
              }}></div>
          </div>

          <div className='flex flex-row flex-nowrap items-center'>{children}</div>
        </div>
      </div>
    </div>
  );
});

export { Picker, PickerSelect, PickerOption };
