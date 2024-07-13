'use client'

import { useRef, useState } from 'react'

import { useRouter } from 'next/navigation'

import { useSession, signOut } from 'next-auth/react'
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import MenuList from '@mui/material/MenuList'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'

// Styled component for badge content
const BadgeContentSpan = styled('span')({
  width: 8,
  height: 8,
  borderRadius: '50%',
  cursor: 'pointer',
  backgroundColor: 'var(--mui-palette-success-main)',
  boxShadow: '0 0 0 2px var(--mui-palette-background-paper)'
})

const UserDropdown = () => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const { data: session } = useSession()
  const router = useRouter()

  const handleDropdownOpen = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleDropdownClose = (event, url) => {
    if (url) {
      router.push(url)
    }

    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    setOpen(false)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <>
      <Badge
        ref={anchorRef}
        overlap="circular"
        badgeContent={<BadgeContentSpan onClick={handleDropdownOpen} />}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        className="mis-2"
      >
        <Avatar
          ref={anchorRef}
          alt='User'
          src='/images/avatars/avatar3d.png'
          onClick={handleDropdownOpen}
          className="cursor-pointer bs-[38px] is-[38px]"
        />
      </Badge>
      <Popper
        open={open}
        transition
        disablePortal
        placement="bottom-end"
        anchorEl={anchorRef.current}
        className="min-is-[240px] !mbs-4 z-[1]"
      >
        {({ TransitionProps, placement }) => (
          <Fade
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom-end' ? 'right top' : 'left top'
            }}
          >
            <Paper className="shadow-lg">
              <ClickAwayListener onClickAway={handleDropdownClose}>
                <MenuList>
                  <div className="flex items-center plb-2 pli-4 gap-2" tabIndex={-1}>
                    <Avatar
                      alt="user profile"
                      src='/images/avatars/avatar3d.png'
                    />
                    <div className="flex items-start flex-col">
                      <Typography className="font-medium" color="text.primary">
                        {session?.user?.name || 'Nama Akun'}
                      </Typography>
                      <Typography variant="caption">
                        {session?.user?.email || 'Email Akun'}
                      </Typography>
                    </div>
                  </div>
                  <Divider className="mlb-1" />
                  <div className="flex items-center plb-2 pli-4">
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      size="medium"
                      endIcon={<i className="ri-logout-box-r-line" />}
                      onClick={handleLogout}
                      sx={{ '& .MuiButton-endIcon': { marginInlineStart: 1.5 } }}
                    >
                      Keluar
                    </Button>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

export default UserDropdown
