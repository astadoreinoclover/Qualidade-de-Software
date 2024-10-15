import { FaStar, FaStarHalfAlt } from "react-icons/fa"

export default function Estrelas({ soma, num }) {
  const media = parseFloat(soma / num)

  const estrelas = []

  for (let i = 1; i <= parseInt(media); i++) {
    estrelas.push(
      <FaStar className="text-yellow-500 inline"/>)
  }

  const decimos = media % 1
  if (decimos >= 0.25 && decimos <= 0.75) {
    estrelas.push(
      <FaStarHalfAlt className="text-yellow-500 inline" />
    )
  } else if (decimos > 0.75) {
    estrelas.push(
      <FaStar className="text-yellow-500 inline"/>)
  }

  return (
    <div className="float-start text-xl">
      {estrelas}
    </div>
  )
}