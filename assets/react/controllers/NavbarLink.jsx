import React from 'react';

export default function NavbarLink({href, text, ...rest}) {
    return (
        <a
            className="rounded-lg p-2.5 text-sm font-medium text-gray-900 hover:text-cyan-700 dark:text-gray-300 dark:hover:text-cyan-500"
            href={href}
            {...rest}>
            {text}
        </a>
    )
}