import React from "react";

const About = () => {
  return (
    <div className="font-mono text-s mb-10 md:mx-40 mx-10 flex flex-col space-y-5 justify-center items-center mt-10">
      <span className="text-left">
        These symmetrical objects live in hyperspace, beyond the 3-dimensional
        world that we inhabit. So it is impossible to draw pictures or make
        models of them. Instead, we use the powerful language of mathematics and
        in particular group theory to explore their properties. The following
        complicated formula describes how the symmetries inside this object can
        be built by taking combinations of 9 basic symmetries called a
        <sub>1</sub>,a<sub>2</sub>,a<sub>3</sub>,b<sub>1</sub>,b<sub>2</sub>,b
        <sub>3</sub>,X,Y,Z.
      </span>
      <img src="/images/equation.png" alt="equation" />
      <span className="text-left">
        The complicated formula tells you how these symmetries interact with
        each other. For example if you do symmetry a<sub>1</sub> followed by b
        <sub>2</sub>, the formula tells you that that leaves the object in the
        same position as if you'd first done symmetry X first then b<sub>2</sub>{" "}
        and then a<sub>1</sub>.
        <br />
        <br /> A similar thing happens with objects we can see. Take a beer mat.
        Place it on the table. First rotate it 90 degrees clockwise then reflect
        or flip the mat in the vertical line running down the middle of the mat.
        This is the same as if I start by rotating the beer mat 180 degrees then
        flip in the vertical then do the rotation by 90 degrees clockwise.
        <br />
        <br />
        Each symmetrical object constructed above is unique because the
        symmetries interact with each other in their own special way. They are
        special because the structures of these objects are connected to the
        arithmetic of elliptic curves. Trying to understand solutions to
        elliptic curves is one of the big open problems in mathematics related
        to one of the Clay Millennium Problems (The Birch-Swinnerton-Dyer
        Conjecture). The elliptic curve associated with each group of symmetries
        is got by taking the 4 numbers C[1], C[2], C[3] and C[4] and putting
        them into the following equation:
      </span>
      <span>
        Y<sup>2</sup>+C[1]XY+C[3]Y=X<sup>3</sup>+C[2]X<sup>2</sup>+C[4]X.
      </span>
      <span className="text-left">
        If you would like to explore a little bit more of the mathematical
        significance of these groups then these two papers are where the first
        groups I constructed are explained. But, be warned, you'll probably need
        a maths degree to understand the intricacies of these papers.
      </span>

      <span className="text-left">
        A nilpotent group and its elliptic curve: non-uniformity of local zeta
        functions of groups, Israel J. of Math 126 (2001), 269-288. Counting
        subgroups in nilpotent groups and points on elliptic curves, J. Reine
        Angew. Math. 549 (2002) 1-21.
      </span>
      <span className="text-left w-full">
        You can read the story of the discovery of these new symmetrical objects
        in Marcus's book Finding Moonshine.
      </span>

      <span className="text-left w-full">
        Marcus du Sautoy FRS OBE Simonyi Professor for the Public Understanding
        of Science and Professor of Mathematics at the University of Oxford.
      </span>
    </div>
  );
};

export default About;
