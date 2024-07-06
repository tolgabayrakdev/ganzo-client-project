import { Flex, Text } from "@mantine/core"
import { Link } from "react-router-dom"

type Props = {}

export default function Home({ }: Props) {
  return (
    <Flex h="100vh" justify="center" align="center" direction="column">
      <h1>Hoşgeldin.</h1>
      <Link style={{ textDecoration: 'none' }} to="/sign-in">
        <Text
          size="md"
          fw={600}
          c="violet"
        >
          Buradan giriş yapabilirsin.
        </Text>
      </Link>
    </Flex>

  )
}