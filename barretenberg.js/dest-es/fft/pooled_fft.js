import createDebug from 'debug';
import { MemoryFifo } from '../fifo';
import { SingleFft } from './single_fft';
const debug = createDebug('bb:fft');
export class PooledFft {
    constructor(pool) {
        this.queue = new MemoryFifo();
        this.ffts = pool.workers.map(w => new SingleFft(w));
    }
    async init(circuitSize) {
        const start = new Date().getTime();
        debug(`initializing fft of size: ${circuitSize}`);
        await Promise.all(this.ffts.map(f => f.init(circuitSize)));
        this.ffts.forEach(async (w) => this.processJobs(w));
        debug(`initialization took: ${new Date().getTime() - start}ms`);
    }
    destroy() {
        this.queue.cancel();
    }
    async processJobs(worker) {
        while (true) {
            const job = await this.queue.get();
            if (!job) {
                break;
            }
            const result = await (job.inverse ? worker.ifft(job.coefficients) : worker.fft(job.coefficients, job.constant));
            job.resolve(result);
        }
    }
    async fft(coefficients, constant) {
        return await new Promise(resolve => this.queue.put({ coefficients, constant, inverse: false, resolve }));
    }
    async ifft(coefficients) {
        return await new Promise(resolve => this.queue.put({ coefficients, inverse: true, resolve }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9vbGVkX2ZmdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mZnQvcG9vbGVkX2ZmdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFdBQVcsTUFBTSxPQUFPLENBQUM7QUFFaEMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUNyQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBR3pDLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQVNwQyxNQUFNLE9BQU8sU0FBUztJQUlwQixZQUFZLElBQWdCO1FBSHBCLFVBQUssR0FBRyxJQUFJLFVBQVUsRUFBTyxDQUFDO1FBSXBDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQW1CO1FBQ25DLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsS0FBSyxDQUFDLDZCQUE2QixXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRCxLQUFLLENBQUMsd0JBQXdCLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU0sT0FBTztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVPLEtBQUssQ0FBQyxXQUFXLENBQUMsTUFBaUI7UUFDekMsT0FBTyxJQUFJLEVBQUU7WUFDWCxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDbkMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixNQUFNO2FBQ1A7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsUUFBUyxDQUFDLENBQUMsQ0FBQztZQUNqSCxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBd0IsRUFBRSxRQUFvQjtRQUM3RCxPQUFPLE1BQU0sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0csQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBd0I7UUFDeEMsT0FBTyxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEcsQ0FBQztDQUNGIn0=