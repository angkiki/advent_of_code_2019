import { Moon } from './_moons';

const deriveVelocityFromGravity = (m1: Moon, m2: Moon, key: string) => {
  // the moon with the greater gravity will decrease in velocity
  if (m1.gravity[key] > m2.gravity[key]) {
    m1.velocity[key] -= 1;
    m2.velocity[key] += 1;
  } else if (m1.gravity[key] < m2.gravity[key]) {
    m1.velocity[key] += 1;
    m2.velocity[key] -= 1;
  }
};

export const computeVelocity = (m1: Moon, m2: Moon) => {
  deriveVelocityFromGravity(m1, m2, 'x');
  deriveVelocityFromGravity(m1, m2, 'y');
  deriveVelocityFromGravity(m1, m2, 'z');
};

const compareWithOtherMoons = (moonArray: Moon[], currentMoon: number) => {
  for (let i = currentMoon + 1; i < moonArray.length; i++) {
    const m1 = moonArray[currentMoon];
    const m2 = moonArray[i];

    computeVelocity(m1, m2);
  }
};

export const simluateTick = (moonArray: Moon[]) => {
  let currMoon = 0;

  while (currMoon < moonArray.length) {
    compareWithOtherMoons(moonArray, currMoon);
    currMoon += 1;
  }

  moonArray.forEach((moon: Moon) => moon.updateMoon());
};
