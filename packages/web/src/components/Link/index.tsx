import NextLink, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, ElementType, FC } from 'react'
import { Url } from 'url'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: Url | string
  as?: ElementType
  link?: Omit<LinkProps, 'href'>
}
const Link: FC<Props> = ({ children, href, as: As, link, ...rest }) => {
  return (
    <NextLink href={href} {...link}>
      {As ? <As {...rest}>{children}</As> : <a {...rest}>{children}</a>}
    </NextLink>
  )
}

export default Link
