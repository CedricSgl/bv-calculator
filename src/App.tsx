import React, { useState } from 'react';
import '@mantine/core/styles.css';
import { Text, Button, Group, MantineProvider, Flex, AppShell, Input, Burger } from '@mantine/core';
//import { useDisclosure } from '@mantine/hooks';

type Produit = {
  id: number;
  nom: string;
  prix: number;
};

const produits: Produit[] = [
  { id: 1, nom: "Bières au fut", prix: 2.5 },
  { id: 3, nom: "Sport Zot", prix: 3 },
  { id: 4, nom: /*"Lupulus Fructus/Taras/Chaumontoise/WunderLager"*/"Bières Légères", prix: 3.5 },
  { id: 5, nom: "Autres Bières", prix: 4 },
  { id: 6, nom: "Grandes Bières", prix: 9 },

  { id: 7, nom: "Verre de vin", prix: 2.5 },
  { id: 9, nom: "Bouteille de vin", prix: 12 },
  { id: 10, nom: "Boissons chaudes", prix: 2 },
  { id: 11, nom: "Limo / Eau pet / Jus", prix: 1.5 },
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
    setValue('')
  }

  //const [opened, { toggle }] = useDisclosure();

  const total = produits.reduce((somme, produit, index) => {
    return somme + produit.prix * quantites[index];
  }, 0);
  const [value, setValue] = useState('');
  const solde = () => {
    const normalizedValue = value.replace(',', '.');
    const numericValue = parseFloat(normalizedValue);
    if (!isNaN(numericValue)) {
      return numericValue - total;
    }
    return - total; // Renvoie la valeur initiale par défaut si l'input n'est pas un nombre
  };

  //const solde = 0 - total;

  return (
    <MantineProvider>
      <AppShell header={{ height: { base: 60, sm: 60, lg: 60 } }} footer={{ height: 60 }}
        navbar={{ width: 300, breakpoint: 'sm'/*, collapsed: { mobile: !opened }*/ }}
        padding="md">
        <AppShell.Header>
          <Group justify='space-between' style={{ margin: 10 }}>
            <Group h="100%" px="md">
              <Text size="lg" style={{ textAlign: 'center' }}>Au Beau Vignet</Text>
            </Group>
            <Text size="lg" style={{ textAlign: 'center' }}>
              Total: {total} €
            </Text>
            <Button onClick={resetQuantites} color="red">
              Reset
            </Button>
          </Group>
        </AppShell.Header>
        <AppShell.Main>
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

        </AppShell.Main>
        <AppShell.Footer>
          <Group justify='space-between' style={{ marginBottom: 10, marginTop: 10, margin: 10 }}>
            <Group>
              <Input placeholder="Total du compte" value={value} type='Number'
                onChange={(event) => setValue(event.currentTarget.value)} />
            </Group>
            <Group>
              <Text size="lg"
                c={solde() < 0 ? 'red' : 'inherit'}>Solde : {solde()} €</Text>

            </Group>

          </Group>
        </AppShell.Footer>
      </AppShell>
    </MantineProvider>



  );
};

export default App;
