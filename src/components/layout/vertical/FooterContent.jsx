'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  // Hooks
  const { isBreakpointReached } = useVerticalNav()

  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span>{`© ${new Date().getFullYear()} GESANG TECHNOLOGY `}</span>
      </p>
      {!isBreakpointReached && (
        <div className='flex items-center gap-4'>
          <Link href='/dashboard/bantuan' className='text-primary'>
            Bantuan
          </Link>
          <Link href='/dashboard/tentang' className='text-primary'>
            Tentang
          </Link>
          <Link href='https://github.com/GesangPJ' target='_blank' className='text-primary'>
            GitHub Page
          </Link>
        </div>
      )}
    </div>
  )
}

export default FooterContent
