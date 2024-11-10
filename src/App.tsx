import React, { useState } from 'react';
import '@mantine/core/styles.css';
import { Container, Text, Button, Group, MantineProvider, Flex } from '@mantine/core';

type Produit = {
  id: number;
  nom: string;
  prix: number;
};

const produits: Produit[] = [
  { id: 1, nom: "Bières au fut", prix: 2.5 },
  { id: 3, nom: "Sport Zot", prix: 3 },
  { id: 4, nom: "Lupulus Fructus/Taras/Chaumontoise", prix: 3.5 },
  { id: 5, nom: "Autres Bières", prix: 4 },
  { id: 6, nom: "Grandes Bières", prix: 9 },

  { id: 7, nom: "Verre de vin", prix: 2.5 },
  { id: 9, nom: "Bouteille de vin", prix: 12 },
  { id: 10, nom: "Boissons chaudes", prix: 2 },
  { id: 11, nom: "Limonade / Eau pet / Jus", prix: 1.5 },
  { id: 12, nom: "Coca", prix: 2 },
  { id: 13, nom: "Chips", prix: 1.5 },
  { id: 14, nom: "Tarte sucrée", prix: 3.5 },
  { id: 15, nom: "Soupe et pain", prix: 5 },
  { id: 16, nom: "Assiette Apéro", prix: 6 },
  { id: 17, nom: "Tarte Salée", prix: 7 },
  { id: 18, nom: "Plat du WE", prix: 12 },

  // Ajoutez d'autres produits si nécessaire
];

const App: React.FC = () => {
  const [quantites, setQuantites] = useState<number[]>(Array(produits.length).fill(0));

  const ajusterQuantite = (index: number, increment: number) => {
    const nouvellesQuantites = [...quantites];
    const nouvelleQuantite = nouvellesQuantites[index] + increment;

    nouvellesQuantites[index] = Math.max(nouvelleQuantite, 0);
    setQuantites(nouvellesQuantites);
  };

  const resetQuantites = () => {
    setQuantites(Array(produits.length).fill(0))
  }

  const total = produits.reduce((somme, produit, index) => {
    return somme + produit.prix * quantites[index];
  }, 0);

  return (
    <MantineProvider>
      <Container fluid bg="var(--mantine-color-blue-light)">
        <Text size="xl" ta="center" style={{ marginBottom: 20 }}>
          Au Beau Vignet
        </Text>
        <Group justify='space-between' style={{ marginBottom: 20 }}>
          <Button onClick={resetQuantites} color="red">
            Reset
          </Button>
          <Text size="lg" style={{ textAlign: 'center' }}>
            Total: {total} €
          </Text>
        </Group>
        {produits.map((produit, index) => (
          <Group justify='space-between' key={produit.id} style={{ marginBottom: 5 }}>
            <Group justify='flex-end'>
              <Text ta='right' >{produit.nom}</Text>
            </Group>
            <Flex gap="xs" align="center" justify="flex-end">
              <Text>{`(${produit.prix} €)`}</Text>
              <Button variant="default" onClick={() => ajusterQuantite(index, -1)}>-</Button>
              <Text>{`${quantites[index]}`}</Text>
              <Button variant="default" onClick={() => ajusterQuantite(index, 1)}>+</Button>
            </Flex>
          </Group>

        ))}

      </Container>
    </MantineProvider>



  );
};

export default App;
