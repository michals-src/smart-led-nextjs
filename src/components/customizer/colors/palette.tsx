import React, { useEffect, useState, FC, ReactElement, useRef } from 'react';
import classNames from 'classnames';

import { PaintBrushIcon } from '@heroicons/react/24/solid'

type IColor = {
    index: number,
    current: string,
    color: string
    onClick?: React.MouseEventHandler
}

type IFCColorsPalette = {
    onCanalShadowChange?: void,
}

const Color: FC<IColor> = ({ index, onClick, current, color }): ReactElement => {

    const ref = useRef(null);
    const [visible, setVisible] = useState(false)

    const cn = classNames('colorElement w-auto p-1 rounded-lg border cursor-pointer border-transparent', {
        // 'border-transparent': color == current ? true : false,
        'border-transparent': color !== current ? true : false,
        'colorElement_visible': visible
    })

    const abc = () => {
        setVisible(true)
        ref.current?.classList.add('colorElement_visible');
    }

    return (
        <div ref={ref} onClick={onClick} className={cn} attr-current={color == current ? 'true' : 'false'} style={{ animationDelay: (index * 0.06) + 's' }} onAnimationEnd={() => abc()}>
            <div className="colorElement-inner w-4 h-4 p-4 rounded-lg text-transparent relative" style={{ backgroundColor: color }}>
                <div className={`colorElement-inner--shadow rounded-lg absolute w-full h-full top-0 left-0`} style={{ boxShadow: `0 5px 5px ${color}` }}></div>
                <span className='block absolute -z-[1] -top-[999px] -left-[999px]'>{color}</span>
            </div>
        </div>
    )
}

const ColorsPalette: FC<IFCColorsPalette> = ({ onCanalShadowChange }): ReactElement => {
    const colors = (['#9D0208', '#D00000', '#E85D04', '#FFBA08', '#99D98C', '#52B69A', '#168AAD', '#184E77']);
    const [currentColor, setCurrentColor] = useState<string>('#9D0208');

    const onChange = (color: string): void => {
        setCurrentColor(color)
        onCanalShadowChange(color)
    }


    return (
        <div className='my-12 flex flex-row flex-nowrap items-center p-6 rounded-lg' style={{ background: '#00000078' }}>
            <div className='w-2/12'><p className='text-zinc-900 font-bold text-sm'><PaintBrushIcon className="w-4 h-4 text-zinc-300" /> </p></div>
            <div className='w-10/12 flex flex-row flex-wrap'>
                {colors.map((c, i) => (
                    <Color index={i} key={i} onClick={(e: React.MouseEvent<HTMLDListElement>) => onChange(c)} current={currentColor} color={c} />
                ))}
            </div>
        </div>
    )
}

export default ColorsPalette