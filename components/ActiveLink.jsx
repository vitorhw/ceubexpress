import Link from 'next/link'
import { cloneElement } from 'react'
import { useRouter } from 'next/router'

export function ActiveLink({ children, shouldMatchExactHref = true, ...rest }) {
  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchExactHref && (asPath === rest.href || asPath === rest.as)) {
    isActive = true;
  }

  if (!shouldMatchExactHref && (asPath.startsWith(String(rest.href)) || asPath.startsWith(String(rest.as)))) {
    isActive = true;
  }

  return (
    <Link {...rest}>
      {cloneElement(children, {
        color: isActive ? 'pink.400' : 'gray.500'
      })}
    </Link>


  );
}