import { Inject, Injectable } from '@angular/core'
import { S3 } from 'aws-sdk'
import { from, Observable } from 'rxjs'

@Injectable()
export class S3UploadService {
  constructor(@Inject('ENV') private environment) {}

  bucket = new S3({
    accessKeyId: this.environment.s3.key,
    secretAccessKey: this.environment.s3.secret,
    region: this.environment.s3.region,
  })

  uploadFile(attchmentId: string, file: File): Observable<any> {
    const timestamp = new Date().getTime()
    const dir = `${this.environment.s3.attachments.base}/${attchmentId}/${timestamp}.${file.name}`
    const request = this.bucket.upload({
      Bucket: this.environment.s3.attachments.bucket,
      Key: dir,
      Body: file,
      ContentType: file.type,
    })

    return from(request.promise())
  }
}
