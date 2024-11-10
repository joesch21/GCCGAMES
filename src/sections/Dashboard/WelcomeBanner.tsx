import { useWallet } from '@solana/wallet-adapter-react'
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import React from 'react'
import styled from 'styled-components'
import { useUserStore } from '../../hooks/useUserStore'

const Buttons = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  @media (min-width: 800px) {
    height: 100%;
  }

  @media (max-width: 800px) {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding-top: 0 !important;
  }

  & > button {
    border: none;
    width: 100%;
    border-radius: 10px;
    padding: 12px;
    background: #FFD700;
    color: #1a1a2e;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      background: #ffdf7e;
      transform: scale(1.05);
    }
  }
`

const Welcome = styled.div`
  @keyframes welcome-fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes backgroundGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  background: linear-gradient(-45deg, #1a1a2e, #2f2f47, #3c3c5e, #1a1a2e);
  background-size: 400% 400%;
  animation: welcome-fade-in 0.8s ease, backgroundGradient 15s ease infinite;
  border-radius: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
  justify-content: center; /* Center content vertically */
  padding: 30px;
  filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.07));
  color: #ffd700;
  text-align: center;
  min-height: 300px; /* Add minimum height to center vertically */

  & > div {
    padding: 0px;
    max-width: 500px;
    filter: drop-shadow(0 4px 3px rgba(0, 0, 0, 0.15)) drop-shadow(0 2px 2px rgba(0, 0, 0, 0.08));
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
    color: #FFD700;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  }

  p {
    font-size: 1.2rem;
    color: #d4af37;
    margin-top: 10px;
  }
`

export function WelcomeBanner() {
  const wallet = useWallet()
  const walletModal = useWalletModal()
  const store = useUserStore()

  const copyInvite = () => {
    store.set({ userModal: true })
    if (!wallet.connected) {
      walletModal.setVisible(true)
    }
  }

  return (
    <Welcome>
      <div>
        <h1>Welcome to Gold Condor Capital Gaming Place 🎲</h1>
        <p>
          Have some fun with minted free test GCC Tokens. 
          <br></br>
          It's just for fun cats, you can't actually win real money!
        </p>
      </div>
    </Welcome>
  )
}
