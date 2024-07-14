// VerticalMenu. Lokasi : /src/components/layout/vertical/VerticalMenu.jsx

'use client'

import React from 'react'

import { useSession } from 'next-auth/react'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }) => {
  const { data: session } = useSession()
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  if (!session) {
    return null
  }

  const isAdmin = session.user.userType === 'ADMIN'
  const isAnggota = session.user.userType === 'ANGGOTA'

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        {isAdmin && (
          <>
            <MenuItem
              href='/dashboard'
              icon={<i className="ri-dashboard-line"></i>}
            >
              Dashboard
            </MenuItem>
            <MenuSection Label='Transaksi Sampah'>
              <SubMenu
                label='Sampah'
                icon={<i class="ri-function-add-fill"></i>}
              >
                <MenuItem href='/dashboard/tambah-transaksi'>Tambah Transaksi</MenuItem>
                <MenuItem href='/dashboard/jenissampah'>Jenis Sampah</MenuItem>
                <MenuItem href='/dashboard/tambah-jenis-sampah'>Tambah Jenis Sampah</MenuItem>
              </SubMenu>
            </MenuSection>
            <SubMenu
              label='Laporan'
              icon={<i className='ri-file-chart-fill' />}
            >
              <MenuItem href='/dashboard/cetak'>Ekspor Laporan</MenuItem>
            </SubMenu>
            <SubMenu
              label='Manajemen Akun'
              icon={<i className='ri-account-circle-fill' />}
            >
              <MenuItem href='/dashboard/daftar-akun'>Tabel Akun</MenuItem>
              <MenuItem href='/dashboard/registrasi-akun'>Registrasi Akun</MenuItem>
              <MenuItem href='/dashboard/reset-password-akun'>Reset Password Akun</MenuItem>
            </SubMenu>
            <SubMenu
              label='Bantuan'
              icon={<i class="ri-question-line"></i>}
            >
              <MenuItem href='/dashboard/bantuan'>Penggunaan</MenuItem>
              <MenuItem href='/dashboard/dokumentasi-api'>Dokumentasi API</MenuItem>
            </SubMenu>
          </>
        )}

        {isAnggota && (
          <>
          <MenuItem
            href='/dashboard'
            icon={<i className="ri-dashboard-line"></i>}
          >
            Dashboard
          </MenuItem>
          <MenuSection Label='Transaksi'>
            <SubMenu
              label='Laporan Transaksi'
              icon={<i className="ri-file-chart-fill"></i>}
            >
              <MenuItem href='/dashboard/ekspor-laporan'>Ekspor Laporan</MenuItem>
              <MenuItem href='/dashboard/harga-sampah'>Harga Jenis Sampah</MenuItem>
            </SubMenu>
            <SubMenu
            label='Bantuan'
            icon={<i class="ri-question-line"></i>}
          >
            <MenuItem href='/dashboard/bantuan'>Penggunaan</MenuItem>
          </SubMenu>
          </MenuSection>
        </>
        )}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
