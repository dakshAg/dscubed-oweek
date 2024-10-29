"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Confetti from "react-confetti";
import { Fireworks } from "fireworks-js";
import { BounceLoader } from "react-spinners";
import FireworksComponent from "../../components/Fireworks";
import Image from "next/image";

// Import dynamic components without SSR

interface Prize {
  name: string;
  description: string;
  image?: string;
}

const possiblePrizes: Prize[] = [
  { name: "iPhone", description: "Brand new iPhone 16!", image: "/iphone.png" },
  {
    name: "Headphones",
    description: "High-quality Airdopes.",
    image: "/boat.png",
  },
  {
    name: "Smartwatch",
    description: "Stylish and feature-rich Noise Smartwatches.",
    image: "/noise.png",
  },
  {
    name: "Gift Voucher",
    description: "Worth $100 to be redeemed at Select Stores!",
    image: "/voucher.webp",
  },
  {
    name: "Diwali Sweets Box",
    description: "Delicious traditional sweets from JMB.",
    image: "/sweets.webp",
  },
];

const pastWinners = [
  { name: "Piya Gupta", prize: "Smartwatch" },
  { name: "Sawan Agrawal", prize: "Diwali Sweets Box" },
  { name: "Ridhi Jain", prize: "Headphones" },
];

const MAX_SPINS = 3; // Maximum number of spins allowed

const DiwaliLuckyDraw = () => {
  const [spinResult, setSpinResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const spinTheWheel = () => {
    if (spinCount >= MAX_SPINS) return; // Prevent spinning if max spins reached

    setIsSpinning(true);
    const randomPrize =
      possiblePrizes[Math.floor(Math.random() * possiblePrizes.length)];
    setTimeout(() => {
      setSpinResult("Better luck next time!");
      setIsSpinning(false);
      setSpinCount((prev) => prev + 1); // Increment spin count
    }, 3000);
  };

  return (
    <div className="bg-orange-50 min-h-screen p-8 text-center text-brown-900">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">
        🚛 G7 Smart Logistics 🚚
      </h1>
      <h2 className="text-2xl font-bold text-orange-500 mb-8">
        🎉 Diwali Lucky Draw 🎉
      </h2>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Spin the Wheel!</h2>
        <div className="flex justify-center items-center">
          {isSpinning ? (
            <BounceLoader color={'#FDD835'} />
          ) : (
            <button 
              className={`px-6 py-3 ${spinCount < MAX_SPINS ? 'bg-orange-500 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'} rounded-lg text-xl font-bold transition transform hover:scale-105`}
              onClick={spinTheWheel}
              disabled={spinCount >= MAX_SPINS}>
              {spinCount < MAX_SPINS ? 'Spin Now' : 'No More Spins'}
            </button>
          )}
        </div>
        {spinResult && (
          <div className="mt-6 text-2xl font-semibold text-green-600">
            {spinResult}!
          </div>
        )}
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Possible Prizes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {possiblePrizes.map((prize, index) => (
            <li key={index} className="bg-orange-100 p-4 rounded-lg shadow-lg">
              <div className="mb-4 flex justify-center">
                <Image
                  src={prize.image as string}
                  alt={prize.name}
                  width={200}
                  height={200}
                />
              </div>
              <h3 className="text-lg font-bold mb-2">{prize.name}</h3>
              <p>{prize.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-semibold mb-4">Past Winners</h2>
        <ul className="text-xl text-orange-600">
          {pastWinners.map((winner, index) => (
            <li key={index} className="my-2">
              🎉 {winner.name} won {winner.prize}!
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-12 text-orange-900">
        <p className="text-xl font-medium">
          ✨ Wishing you a joyful Diwali! ✨
        </p>
      </footer>

      <div className="floating-images">
        <Image
          src="/rikshaw.png"
          alt="Diya"
          width={200}
          height={200}
          className="floating-image float1"
        />
        <Image
          src="/swan.png"
          alt="Firework"
          width={200}
          height={200}
          className="floating-image float2"
        />
        <Image
          src="/teddie.png"
          alt="Lantern"
          width={200}
          height={200}
          className="floating-image float3"
        />
      </div>
    </div>
  );
};

export default DiwaliLuckyDraw;
