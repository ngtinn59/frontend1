import clsx from 'clsx';
import React, { useEffect } from 'react';

const FlexInput = React.forwardRef(
  (
    {
      className,
      innerClassName,
      iconLeft,
      iconRight,
      cvStyle = true,
      setCurrent,
      onChange,
      ...props
    },
    ref,
  ) => {
    useEffect(() => {
      const tx = document.querySelectorAll('textarea.autoresize');
      for (let i = 0; i < tx.length; i++) {
        tx[i].setAttribute('style', 'height:' + tx[i].scrollHeight + 'px;');
        tx[i].addEventListener('input', OnInput, false);
      }

      function OnInput() {
        this.style.height = 0;
        this.style.height = this.scrollHeight + 'px';
      }
    }, []);

    return (
      <div
        className={clsx(
          'd-flex gap-1 mt-2 align-items-start z-index-1',
          className,
        )}
      >
        <div className="cv-text-main">{iconLeft || null}</div>
        <textarea
          className={clsx(
            'autoresize resize-none overflow-hidden w-100 border-0', // thêm 'border-0' để xóa viền
            cvStyle && 'cv-input',
            innerClassName,
          )}
          rows={1}
          onChange={(e) => {
            if (setCurrent) setCurrent(e.target.value);
            else onChange(e);
          }}
          ref={ref}
          {...props}
        />
        <div className="text-main">{iconRight || null}</div>
      </div>
    );
  },
);

export default FlexInput;


export const InputReadOnly = React.forwardRef(
  (
    {
      className,
      iconLeft,
      iconRight,
      innerClassName,
      textClass,
      cvStyle = true,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        className={clsx('d-flex gap-1 align-items-start z-index-1', className)}
      >
        <div className="cv-text-main">{iconLeft || null}</div>
        <input
          className={clsx(
            'resize-none overflow-hidden w-100 border-0 fs-5', // thêm 'border-0' để xóa viền
            textClass,
            innerClassName,
          )}
          readOnly
          ref={ref}
          {...props}
        />
        <div className="text-main">{iconRight || null}</div>
      </div>
    );
  },
);
