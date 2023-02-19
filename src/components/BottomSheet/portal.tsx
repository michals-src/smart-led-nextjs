import React from 'react'
import ReactDOM from 'react-dom'

const Portal = function ({ children, parent }: {
    children?: React.ReactElement | React.ReactFragment,
    parent?: any
}) {

    let el = React.useMemo(() => document.createElement('div'), []);

    React.useEffect(() => {

        const target = parent && parent.appendChild ? parent : document.body;

        target.classList.add('portal-wrapper');
        target.appendChild(el);

        return function () {
            target.removeChild(el);
        }
    }, [])

    return ReactDOM.createPortal(children, el)
}

export default Portal