import { Prover } from './prover';
import { PooledPippenger } from '../../pippenger';
import { PooledFft } from '../../fft';
import { UnrolledProver } from './unrolled_prover';
export class PooledProverFactory {
    constructor(pool, crsData) {
        this.pool = pool;
        this.crsData = crsData;
        this.fft = {};
    }
    async init(circuitSize) {
        if (!this.pippenger) {
            const pippenger = new PooledPippenger();
            await pippenger.init(this.crsData, this.pool);
            this.pippenger = pippenger;
        }
        if (!this.fft[circuitSize]) {
            const fft = new PooledFft(this.pool);
            await fft.init(circuitSize);
            this.fft[circuitSize] = fft;
        }
    }
    async createProver(circuitSize) {
        await this.init(circuitSize);
        return new Prover(this.pool.workers[0], this.pippenger, this.fft[circuitSize]);
    }
    async createUnrolledProver(circuitSize) {
        await this.init(circuitSize);
        return new UnrolledProver(this.pool.workers[0], this.pippenger, this.fft[circuitSize]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbGVkX3Byb3Zlcl9mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NsaWVudF9wcm9vZnMvcHJvdmVyL3Bvb2xlZF9wcm92ZXJfZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBRWxDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQU8sU0FBUyxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVuRCxNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLFlBQW9CLElBQWdCLEVBQVUsT0FBbUI7UUFBN0MsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQVk7UUFGekQsUUFBRyxHQUEyQixFQUFFLENBQUM7SUFFMkIsQ0FBQztJQUU3RCxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQW1CO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7WUFDeEMsTUFBTSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1NBQzVCO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDMUIsTUFBTSxHQUFHLEdBQUcsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztTQUM3QjtJQUNILENBQUM7SUFFRCxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQW1CO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QixPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxLQUFLLENBQUMsb0JBQW9CLENBQUMsV0FBbUI7UUFDNUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzdCLE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztDQUNGIn0=