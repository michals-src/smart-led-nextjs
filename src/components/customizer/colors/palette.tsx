import React, { useEffect, useState, FC, ReactElement } from 'react';
import classNames from 'classnames';

type IColor = {
    current: string,
    color: string
    onClick?: React.MouseEvent
}

const Color: FC<IColor> = ({ onClick, current, color }): ReactElement => {

    const cn = classNames('colorElement w-auto p-1 rounded-lg border cursor-pointer border-transparent', {
        // 'border-transparent': color == current ? true : false,
        'border-transparent': color !== current ? true : false
    })


    return (
        <div onClick={onClick} className={cn} attr-current={color == current ? 'true' : 'false'}>
            <div className="colorElement-inner w-4 h-4 p-4 rounded-lg text-transparent relative" style={{ backgroundColor: color }}>
                <div className={`colorElement-inner--shadow rounded-lg absolute w-full h-full top-0 left-0`} style={{ boxShadow: `0 5px 5px ${color}` }}></div>
                <span className='block absolute -z-[1] -top-[999px] -left-[999px]'>{color}</span>
            </div>
        </div>
    )
}

export default function colorsPalette() {

    const colors = (['#9D0208', '#D00000', '#E85D04', '#FFBA08', '#99D98C', '#52B69A', '#168AAD', '#184E77']);
    const [currentColor, setCurrentColor] = useState<string>('#9D0208');

    const onChange = (color: string): void => {
        setCurrentColor(color)
    }


    return (
        <div className='my-12 flex flex-row flex-wrap'>
            {colors.map(c => (
                <Color onClick={(e: React.MouseEvent<HTMLDListElement>) => onChange(c)} current={currentColor} color={c} />
            ))}
        </div>
    )
}
