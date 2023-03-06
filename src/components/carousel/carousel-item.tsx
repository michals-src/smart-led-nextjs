import React, { useContext, useEffect, useRef, useState, FC, HTMLInputTypeAttribute, createContext, useCallback } from 'react';
import classNames from 'classnames';

import { ChatBubbleBottomCenterIcon, HashtagIcon, MapPinIcon, PuzzlePieceIcon, StarIcon } from '@heroicons/react/24/outline';
import { ArrowsUpDownIcon, LightBulbIcon, PlusIcon, XCircleIcon } from '@heroicons/react/24/solid';

import { Layout, Picker, PickerOption, PickerSelect, Switch, List, Accordion, Input, Button, Slider } from '@components';


const CarouselItem = React.forwardRef<HTMLDivElement, any>(function CarouselItem(props, ref) {

    const { children, moving, onClick: onClickProps, ...other } = props;
    const refEl = useRef(null);

    useEffect(() => {
        //console.log('item ', moving)

    }, [moving])

    const handleClick = (e: any) => {
        //console.log(moving)
        if (!moving) onClickProps?.(e);
    }

    return <div ref={element => {
        (refEl as React.MutableRefObject<HTMLDivElement | null>).current = element;
        if (typeof ref === 'function') ref(element);
        else if (ref) ref.current = element;
    }} className='w-auto h-full flex-[1_0_auto]' onClick={handleClick} {...other}>{children}</div>;
    return <div className='w-full h-full flex-[1_0_auto]'>{children}</div>;
});

export default CarouselItem