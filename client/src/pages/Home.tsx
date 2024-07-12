import { Flex, Text, Title } from "@mantine/core"
import { Link } from "react-router-dom"

type Props = {}

export default function Home({ }: Props) {
  return (
    <Flex h="100vh" justify="center" align="center" direction="column">
      <Title order={1}>Hoşgeldin</Title>
      <Link style={{ textDecoration: 'none', marginTop: "3px" }} to="/sign-in">
        <Text
          style={{ textDecoration: 'none', fontWeight: "600" }}
          size="md"
          fw={600}
          c="indigo"
        >
          Buradan giriş yapabilirsin.
        </Text>
      </Link>
    </Flex>

  )
}