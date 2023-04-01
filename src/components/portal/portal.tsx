import React from 'react'
import ReactDOM from 'react-dom'

const Portal = function ({ children, parent, onCreate }: {
    children?: React.ReactElement | React.ReactFragment,
    parent?: any,
    onCreate?: any
}) {

    let el = React.useMemo(() => document.createElement('div'), []);

    React.useEffect(() => {

        const target = parent && parent.appendChild ? parent : document.body;

        target.classList.add('portal-wrapper');
        target.appendChild(el);
        onCreate?.();

        return function () {
            target.removeChild(el);
        }
    }, [])

    return ReactDOM.createPortal(children, el)
}

export default Portal