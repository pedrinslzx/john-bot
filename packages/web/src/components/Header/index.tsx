import { Header as PHeader } from '@primer/components'
import { FC } from 'react'
import Link from '../Link'

const Header: FC = () => {
  return (
    <PHeader>
      <PHeader.Item full>
        <Link as={PHeader.Link} href="/">
          John Bot
        </Link>
      </PHeader.Item>
      <PHeader.Item>
        <Link as={PHeader.Link} href="/commands">
          Comandos
        </Link>
      </PHeader.Item>
      <PHeader.Item>
        <Link as={PHeader.Link} href="/invite">
          Adicione em seu servidor
        </Link>
      </PHeader.Item>
    </PHeader>
  )
}

export default Header
