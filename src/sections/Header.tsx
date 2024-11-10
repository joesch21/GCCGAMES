import { GambaUi, TokenValue, useCurrentPool, useGambaPlatformContext, useUserBalance } from 'gamba-react-ui-v2'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Modal } from '../components/Modal'
import { PLATFORM_JACKPOT_FEE } from '../constants'
import TokenSelect from './TokenSelect'
import { UserButton } from './UserButton'

// Styled component for the bonus button
const Bonus = styled.button`
  all: unset;
  cursor: pointer;
  color: #003c00;
  border-radius: 15px;
  background: #03ffa4;
  padding: 2px 10px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: white;
  }
`

// Styled component for the BNB Smart Chain button
const BnbButton = styled.button`
  all: unset;
  cursor: pointer;
  color: #ffffff;
  border-radius: 15px;
  background: #f0b90b;
  padding: 2px 10px;
  font-size: 15px;
  text-transform: uppercase;
  font-weight: bold;
  transition: background-color 0.2s;
  &:hover {
    background: #ffca28;
  }
`

// Header styling with background and blur effect
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  background: rgba(33, 34, 51, 0.9);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  backdrop-filter: blur(20px);
`

// Logo styling
const Logo = styled(NavLink)`
  height: 35px;
  margin: 0 10px;
  & > img {
    height: 100%;
  }
`

// Main Header Component
export default function Header() {
  const pool = useCurrentPool() // Fetches current pool data
  const context = useGambaPlatformContext() // Platform context for jackpot settings
  const balance = useUserBalance() // Fetches user balance
  const [bonusHelp, setBonusHelp] = useState(false) // State to toggle Bonus modal
  const [jackpotHelp, setJackpotHelp] = useState(false) // State to toggle Jackpot modal

  return (
    <>
      {/* Bonus Modal */}
      {bonusHelp && (
        <Modal onClose={() => setBonusHelp(false)}>
          <h1>Bonus ✨</h1>
          <p>
            You have <b><TokenValue amount={balance.bonusBalance} /></b> worth of free plays. This bonus will be applied automatically when you play.
          </p>
          <p>Note that a fee is still needed from your wallet for each play.</p>
        </Modal>
      )}

      {/* Jackpot Modal */}
      {jackpotHelp && (
        <Modal onClose={() => setJackpotHelp(false)}>
          <h1>Jackpot 💰</h1>
          <p style={{ fontWeight: 'bold' }}>
            There's <TokenValue amount={pool.jackpotBalance} /> in the Jackpot.
          </p>
          <p>
            The Jackpot is a prize pool that grows with every bet made. As the Jackpot grows, so does your chance of winning. Once a winner is selected, the value of the Jackpot resets and grows from there until a new winner is selected.
          </p>
          <p>
            You will be paying a maximum of {(PLATFORM_JACKPOT_FEE * 100).toLocaleString(undefined, { maximumFractionDigits: 4 })}% for each wager for a chance to win.
          </p>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {context.defaultJackpotFee === 0 ? 'DISABLED' : 'ENABLED'}
            <GambaUi.Switch
              checked={context.defaultJackpotFee > 0}
              onChange={(checked) => context.setDefaultJackpotFee(checked ? PLATFORM_JACKPOT_FEE : 0)}
            />
          </label>
        </Modal>
      )}

      {/* Header Layout */}
      <StyledHeader>
  {/* Logo Section */}
  <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
    <Logo to="/">
      <img alt="GCC logo" src="/logo.png" />
    </Logo>
  </div>

  {/* Right-side Header Actions */}
  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', position: 'relative' }}>
    {pool.jackpotBalance > 0 && (
      <Bonus onClick={() => setJackpotHelp(true)}>
        💰 <TokenValue amount={pool.jackpotBalance} />
      </Bonus>
    )}
    {balance.bonusBalance > 0 && (
      <Bonus onClick={() => setBonusHelp(true)}>
        ✨ <TokenValue amount={balance.bonusBalance} />
      </Bonus>
    )}
    <TokenSelect />
    {/* Remove the UserButton component */}
    {/* <UserButton /> */}
  </div>
</StyledHeader>

    </>
  )
}
