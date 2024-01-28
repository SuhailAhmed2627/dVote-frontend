cd zkp

wget -nc https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_16.ptau
circuit_name=ticket_spender
powersoftau=powersOfTau28_hez_final_16

mkdir -p snark_data &&
circom ./circuits/$circuit_name.circom --wasm --r1cs -o snark_data &&
npx snarkjs plonk setup \
    ./snark_data/$circuit_name.r1cs \
    $powersoftau.ptau \
    ./snark_data/${circuit_name}_final.zkey \
&&
npx snarkjs zkey export verificationkey \
    ./snark_data/${circuit_name}_final.zkey \
    ./snark_data/verification_key.json