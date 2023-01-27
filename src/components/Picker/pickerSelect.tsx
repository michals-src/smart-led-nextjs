import React, { useState, useEffect, forwardRef, useRef, Ref } from "react";
/**
 *
 * <Picker>
 * <PickerSelect value="0" onChange>
 *   <PickerOption value="0">Nazwa</PickerOption>
 * </PickerSelect/>
 * </Picker>
 *
 */

const PickerSelect = forwardRef(function PickerSelect(
  props: {
    children: React.ReactNode;
    onChange: any;
    value: any;
  },
  ref: Ref<HTMLDivElement>
) {
  const { children, onChange: onChangeCallback, value: defaultValue = 0, ...other } = props;

  const [move, setMove] = useState<boolean>(false);
  const [moving, setMoving] = useState<Array<number>>([0, 0]);
  const [translate, setTranslate] = useState<number>(0);
  const [value, setValue] = useState<number>(0);

  const itemsRef = useRef<any>({});
  const selectRef = useRef<HTMLDivElement>(null);

  const childrenArr = !Array.isArray(children) || children.length <= 0 ? [] : children;

  let indexDefault = 0;

  for (const [index, child] of Object.entries(childrenArr)) {
    if (!React.isValidElement(child)) indexDefault = 0;
    if (String(defaultValue) === String(child?.props.value)) {
      indexDefault = parseInt(index, 10);
    }
  }

  const handle_mouseEnter = (e: any) => {
    setMove(true);
    if (selectRef.current !== null) {
      selectRef.current.style.transitionDuration = "0s";
    }
  };

  const handle_mouseMove = (e: any) => {
    if (e.type !== "touchmove" && e.buttons !== 1) {
      setMove(false);
      setMoving([0, 0]);
      if (translate >= childrenArr.length - 1) setTranslate(childrenArr.length - 1);
      return;
    }

    const consumer = e.type === "touchmove" ? e.touches[0] : e;

    setMoving((state) => {
      const currScreenY = consumer.screenY;
      if (state[1] === 0) return [0, currScreenY];

      let calculateMove = state[1] - currScreenY;
      let currMovingY = state[0] + calculateMove;

      return [currMovingY, currScreenY];
    });
  };

  const handle_mouseLeave = (e: any) => {
    if (moving[0] >= 10 || moving[0] <= -10) {
      let multiplicatorY = Math.round(moving[0] / 32);

      setTranslate((state) => {
        let val = state + multiplicatorY;

        // if (!dirY) value = state + multiplicatorY;
        // if (dirY) value = state - multiplicatorY;

        if (val <= 0) val = 0;
        if (val >= childrenArr.length - 1) val = childrenArr.length - 1;

        if (val !== state) setValue(val);

        return val;
      });
    }

    setMove(false);
    setMoving([0, 0]);

    if (selectRef.current !== null) {
      selectRef.current.style.transitionDuration = "1.5s";
    }
  };

  useEffect(() => {
    if (selectRef.current === null) return;
    if (move) {
      selectRef.current.style.transform = `translateY(-${32 * translate + moving[0]}px)`;

      return;
    }

    selectRef.current.style.transform = `translateY(-${32 * translate}px)`;

    if (itemsRef.current[value].current !== null && itemsRef.current[value] !== "undefined") itemsRef.current[value].current.click();
  }, [moving[0], translate]);

  useEffect(() => {
    setValue(indexDefault);
    setTranslate(indexDefault);
  }, [defaultValue]);

  const handleChange = (event: any, child: any) => {
    if (child.props === null || child.props === "undefined") return;

    const newValue = child.props.value;
    if (!onChangeCallback || !event || newValue === value) return;

    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);

    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: { value: child.props.value },
    });

    onChangeCallback(clonedEvent, child);
  };

  const items = childrenArr.map((child: React.ReactNode, index: number) => {
    if (!React.isValidElement(child)) return;

    let selected = false;
    if (child.props.value !== null && child.props.value !== "undefined") {
      selected = String(defaultValue) === String(child.props.value);
    }

    return React.cloneElement<any>(child, {
      key: `picker-select-option-${index}`,
      "aria-selected": selected,
      "data-value": child.props.value,
      role: "option",
      value: undefined,
      //onClick: handleOptionClick(child),
      onClick: (e: any) => handleChange(e, child),
      ref: (e: any) => {
        itemsRef.current[index] = {
          current: e,
        };
      },
    });
  });

  const touchEvents = {
    onMouseDown: (e: any) => handle_mouseEnter(e),
    onMouseMove: (e: any) => handle_mouseMove(e),
    onMouseUp: (e: any) => handle_mouseLeave(e),
    onMouseLeave: (e: any) => handle_mouseLeave(e),
    onTouchStartCapture: (e: any) => handle_mouseEnter(e),
    onTouchStart: (e: any) => handle_mouseEnter(e),
    onTouchMove: (e: any) => handle_mouseMove(e),
    onTouchCancel: (e: any) => handle_mouseLeave(e),
    onTouchEnd: (e: any) => handle_mouseLeave(e),
  };

  return (
    <div
      ref={ref}
      className='w-full relative select-none'>
      <div
        className='w-full h-[64px] absolute top-0 left-0 z-10'
        style={{
          background: "linear-gradient(to bottom, #18181b 0%, rgba(0,0,0,0) 100%)",
        }}></div>
      <div className={`overflow-hidden h-[160px] px-3`}>
        <div
          className='pt-[64px] w-full'
          ref={selectRef}
          style={{
            transitionProperty: "transform 0.3s ease",
            transitionDuration: "0.3s",
            transitionTimingFunction: "ease",
          }}>
          {items}
        </div>
      </div>
      <div
        className='w-full h-[64px] absolute bottom-0 left-0 z-10'
        style={{
          background: "linear-gradient(to top, #18181b 0%, rgba(0,0,0,0) 100%)",
        }}></div>
      <div
        className='w-full h-full absolute left-0 top-0 touch-pan-x z-30 cursor-pointer'
        {...touchEvents}></div>
    </div>
  );
});

export default PickerSelect;
